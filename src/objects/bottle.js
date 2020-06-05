import BottleConfs from "../../confs/bottle.confs"
import BlockConfs from "../../confs/block-confs"
import GameConfs from "../../confs/game.confs"
import { customAnimation, TweenAnimation } from "../../libs/animation" 
import AudioManager from "../modules/index"
import ScoreText from "../view3d/scoreText"
class Bottle{
    constructor(){
        this.direction = 0
        this.axis = null
        this.status = 'stop'
        this.scale = 1
        this.flyingTime = 0
        this.translateH = 0
        this.translateY = 0
        this.destination = {}
        this.velocity = {
            vx:0,
            vy:0
        }
    }
    init(){
        this.loader = new THREE.TextureLoader()
        this.obj = new THREE.Object3D()
        this.obj.name = "bottle"
        this.obj.position.set(
            BottleConfs.initPosition.x,
            BottleConfs.initPosition.y + 30,
            BottleConfs.initPosition.z)
        
        this.bottle = new THREE.Object3D()
        this.human = new THREE.Object3D()
        var basicMaterial = new THREE.MeshPhongMaterial({
            color:0x800080
        })

        var headRadius = BottleConfs.headRadius

        var bottom = new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.62857 * headRadius,
                0.907143 * headRadius,
                1.91423 * headRadius,
                20
            ),
            basicMaterial
        )
        bottom.castShadow = true

        var middle = new THREE.Mesh(
            new THREE.CylinderGeometry(
                headRadius / 1.4,
                headRadius / 1.44 * 0.88,
                headRadius * 1.2,
                20
            ),
            basicMaterial
        )
        middle.position.x = 0
        middle.position.y = 1.3857 * headRadius
        middle.position.z = 0
        middle.castShadow = true

        var topGeometry = new THREE.SphereGeometry(headRadius / 1.4, 20, 20)
        topGeometry.scale(1, 0.54, 1)
        var top = new THREE.Mesh(
            topGeometry,
            basicMaterial
        )
        top.castShadow = true
        top.position.x = 0
        top.position.y = 1.8143 * headRadius
        top.position.z = 0

        this.body = new THREE.Object3D()
        this.body.add(bottom)
        this.body.add(middle)
        this.body.add(top)

        this.head = new THREE.Mesh(
            new THREE.OctahedronGeometry(headRadius),
            basicMaterial
        )
        this.head.castShadow = true
        this.head.position.x = 0
        this.head.position.y = 3.57143 * headRadius
        this.head.position.z = 0 

        this.human.add(this.body)
        this.human.add(this.head)

        this.bottle.add(this.human)

        this.bottle.position.x = 0
        this.bottle.position.y = 2.2
        this.bottle.position.z = 0 
        
        this.obj.add(this.bottle)
        this.particles = []
        const _this = this
        const whiteParticleMaterial = new THREE.MeshBasicMaterial({
            alphaTest:0.5,
            map:this.loader.load("/game/res/images/white.png")
        })

        const greenParticleMaterial = new THREE.MeshBasicMaterial({
            alphaTest:0.5,
            map:this.loader.load("/game/res/images/green.png")
        })
        const particleGeometry = new THREE.PlaneGeometry(2,2)
        for(let i = 0; i < 15; i++){
            let particle = new THREE.Mesh(particleGeometry, whiteParticleMaterial)
            particle.rotation.x = -Math.PI / 4
            particle.rotation.y = -Math.PI / 5
            particle.rotation.z = -Math.PI / 5
            this.particles.push(particle)
            this.obj.add(particle)
        }
        for(let i = 0; i < 5; i++){
            let particle = new THREE.Mesh(particleGeometry, greenParticleMaterial)
            particle.rotation.x = -Math.PI / 4
            particle.rotation.y = -Math.PI / 5
            particle.rotation.z = -Math.PI / 5
            this.particles.push(particle)
            this.obj.add(particle)
        }
        this.ScoreText = new ScoreText()
        this.ScoreText.init({
            fillStyle:0x252525
        })
        this.ScoreText.instance.visible = false
        this.ScoreText.instance.rotation.y = -Math.PI / 4
        this.ScoreText.instance.scale.set(0.5, 0.5, 0.5)
        this.obj.add(this.ScoreText.instance)
    }
    showAddScore(score){
        const value = '+' + score
        this.ScoreText.updateScore(value)
        this.ScoreText.instance.visible = true
        this.ScoreText.instance.position.y = 3
        this.ScoreText.instance.material.opacity = 1

        customAnimation.to(0.7, this.ScoreText.instance.position, {
            y:BlockConfs.height + 6
        }) 
        TweenAnimation(this.ScoreText.instance.material.opacity, 0, 0.7, 'Linear', (value, complete)=>{
            this.ScoreText.instance.material.opacity = value
            if(complete){
                this.ScoreText.instance.visible = false
            }
        })
    }
    resetParticles(){
        if(this.gatherTimer){
            clearTimeout(this.gatherTimer)
        }
        this.gatherTimer = null
        for(let i = 0; i < this.particles.length; i++){
            this.particles[i].gathering = false
            this.particles[i].scattering = false
            this.particles[i].visible = false
        }
    }
    scatterParticles(){
        for(let i = 0; i < 10; i++ )
        {
            this.particles[i].scattering = true
            this.particles[i].gathering = false
            this._scatterParticle(this.particles[i]) 
        }
    }
    _scatterParticle(particle){
        const minDistance = BottleConfs.bodyWidth
        const maxDistance = 2
        const x = (minDistance + Math.random() * (maxDistance - minDistance)) * (1 - 2 * Math.random())
        const z = (minDistance + Math.random() * (maxDistance - minDistance)) * (1 - 2 * Math.random())    
        particle.scale.set(1, 1, 1)
        particle.visible = false
        particle.position.x = x 
        particle.position.y = -0.5  
        particle.position.z = z
        setTimeout(((particle)=>{
            return ()=>{
                if(!particle.scattering) return;
                particle.visible = true
                const duration = 0.3 + Math.random() * 0.2
                customAnimation.to(duration, particle.scale, {
                    x: 0.2,
                    y: 0.2,
                    z: 0.2
                })
                customAnimation.to(duration, particle.position, {
                    x: 2 * x ,
                    y: Math.random() * 2.5 + 2,
                    z: 2 * z
                },undefined, undefined, ()=>{
                    particle.scattering = false
                    particle.visible = false
                })
            }
        })(particle), Math.random() * 500)
    }
    gatherParticle(){
        for (let i = 10; i < 20; i++ ){
            this.particles[i].gathering = true
            this.particles[i].scattering = false 
            this._gatherParticle(this.particles[i])
        }
        this.gatherTimer = setTimeout(()=>{
            for (let i = 0; i < 10; i++ ){
                this.particles[i].gathering = true
                this.particles[i].scattering = false 
                this._gatherParticle(this.particles[i])
            }
        }, 500 + 1000 * Math.random())
    }
    _gatherParticle(particle){
        const minDistance = 1
        const maxDistance = 8
        particle.visible = false
        const x = Math.random() > 0.5? 1:-1
        const z = Math.random() > 0.5? 1:-1
        particle.position.x = (minDistance + (maxDistance - minDistance) * Math.random()) * x
        particle.position.y = (minDistance + (maxDistance - minDistance) * Math.random())
        particle.position.z = (minDistance + (maxDistance - minDistance) * Math.random()) * z
        setTimeout(((particle)=>{
            return ()=>{
                if(!particle.gathering) return;
                particle.visible = true
                const duration = 0.5 + Math.random() * 0.4
                customAnimation.to(duration, particle.scale, {
                    x: 0.8 + Math.random() ,
                    y: 0.8 + Math.random() ,
                    z: 0.8 + Math.random()
                })
                customAnimation.to(duration, particle.position, {
                    x: Math.random() * x ,
                    y: Math.random() * 2.5,
                    z: Math.random() * z
                },undefined, undefined, ()=>{
                    if(particle.gathering){
                        this._gatherParticle(particle)
                    }
                })
            }
        })(particle), Math.random() * 500)

    }
    _shrink(){
        const MIN_SCALE = 0.55
        const HORIZON_DELTA_SCALE = 0.007
        const DELTA_SCALE = 0.005
        const HEAD_DELTA = 0.03

        this.scale -= DELTA_SCALE
        this.scale = Math.max(MIN_SCALE, this.scale)
        if(this.scale <= MIN_SCALE){
            return;
        }
        this.body.scale.y = this.scale
        this.body.scale.x += HORIZON_DELTA_SCALE
        this.body.scale.z += HORIZON_DELTA_SCALE
        this.head.position.y -= HEAD_DELTA

        const bottleDeltaY = HEAD_DELTA / 2 
        const deltaY = BlockConfs.height * DELTA_SCALE / 2
        this.obj.position.y -= (bottleDeltaY + deltaY * 2) 
    }
    update(){
       if(this.status == "shrink"){
           this._shrink()
       }else if(this.status == "jump"){
           const tickTime = Date.now() - this.lastFrameTime 
           this._jump(tickTime)
       }
       this.head.rotation.y += 0.06 
       this.lastFrameTime = Date.now()
    }
    showUp(){
        AudioManager.init.play()
        customAnimation.to(0.5, this.obj.position, {
            x:BottleConfs.initPosition.x,
            y:BottleConfs.initPosition.y + BlockConfs.height / 2,
            z:BottleConfs.initPosition.z
        }, "Bounce.easeOut", 0.5)
    }
    setDirection(direction, axis){
        this.direction = direction
        this.axis = axis
    }
    shrink () {
        this.status = "shrink"
        this.gatherParticle()
    }

    stop(){
        this.scale = 1
        this.flyingTime = 0
        this.status = "stop"
        this.velocity = {
            vx: 0, // 水平方向速度
            vy: 0 //竖直方向速度
        }
    }

    jump(){
        this.status = 'jump'
        this.translateH = 0
        this.translateY = 0
        this.resetParticles()
    }
    _jump(tickTime){
        const t = tickTime / 1000
        const translateH = this.velocity.vx * t
        const translateY = this.velocity.vy * t - 0.5 * GameConfs.gravity * t * t - GameConfs.gravity * this.flyingTime * t
        this.translateH += translateH
        this.translateY += translateY
        this.obj.translateY(translateY)
        this.obj.translateOnAxis(this.axis, translateH)
        this.flyingTime = this.flyingTime + t
    }
    forerake(){
        this.status = 'forerake'
        setTimeout(()=>{
            if(this.direction == 0){
                customAnimation.to(1, this.obj.rotation, {
                    z: -Math.PI / 2
                })  
            } else {
                customAnimation.to(1, this.obj.rotation, {
                    x: -Math.PI / 2
                })
            }
            setTimeout(()=>{
                customAnimation.to(0.4, this.obj.position, {
                    y : -BlockConfs.height / 2 + 1.2
                })
            },350)
        },200)
    }
    hypsokinesis(){
        this.status = 'hypsokinesis'
        setTimeout(()=>{
            if(this.direction == 0){
                customAnimation.to(0.8, this.obj.rotation, {
                    z: Math.PI / 2
                })  
            } else {
                customAnimation.to(0.8 , this.obj.rotation, {
                    x: Math.PI / 2
                })
            }
            setTimeout(()=>{
                customAnimation.to(0.4, this.obj.position, {
                    y : -BlockConfs.height / 2 + 1.2
                })
                customAnimation.to(0.2, this.head.position, {
                    x: 1.125
                })
                customAnimation.to(0.2, this.head.position, {
                    x: 0
                }, 'Linear', 0.2)
            },350)
        },200)
    }
    rotate () {    
        const scale = 1.4
        this.human.rotation.z = this.human.rotation.x = 0
        if (this.direction == 0) { // x
          customAnimation.to( 0.14, this.human.rotation, { z: this.human.rotation.z - Math.PI })
          customAnimation.to( 0.18, this.human.rotation, { z: this.human.rotation.z - 2 * Math.PI},'Linear',0.14)
          customAnimation.to( 0.1, this.head.position,{ y: this.head.position.y + 0.9 * scale, x: this.head.position.x + 0.45 * scale })
          customAnimation.to( 0.1, this.head.position, { y: this.head.position.y - 0.9 * scale, x: this.head.position.x - 0.45 * scale },'Linear',0.1)
          customAnimation.to( 0.15, this.head.position, { y: 7.56, x: 0 },'Linear', 0.25)
          customAnimation.to( 0.1, this.body.scale,  { y: Math.max(scale, 1), x: Math.max(Math.min(1 / scale, 1), 0.7), z: Math.max(Math.min(1 / scale, 1), 0.7) })
          customAnimation.to( 0.1, this.body.scale, { y: Math.min(0.9 / scale, 0.7), x: Math.max(scale, 1.2), z: Math.max(scale, 1.2)},'Linear',0.1)
          customAnimation.to( 0.3, this.body.scale, { y: 1, x: 1, z: 1},'Linear', 0.2)
        } else if (this.direction == 1) { // z
          customAnimation.to( 0.14, this.human.rotation, { x: this.human.rotation.x - Math.PI })
          customAnimation.to( 0.18, this.human.rotation, { x: this.human.rotation.x - 2 * Math.PI, delay: 0.14 })
          customAnimation.to( 0.1, this.head.position, { y: this.head.position.y + 0.9 * scale, z: this.head.position.z - 0.45 * scale })
          customAnimation.to( 0.1, this.head.position, { z: this.head.position.z + 0.45 * scale, y: this.head.position.y - 0.9 * scale, delay: 0.1 })
          customAnimation.to( 0.15, this.head.position, { y: 7.56, z: 0, delay: 0.25 })
          customAnimation.to( 0.05, this.body.scale, { y: Math.max(scale, 1), x: Math.max(Math.min(1 / scale, 1), 0.7), z: Math.max(Math.min(1 / scale, 1), 0.7) })
          customAnimation.to( 0.05, this.body.scale, { y: Math.min(0.9 / scale, 0.7), x: Math.max(scale, 1.2), z: Math.max(scale, 1.2), delay: 0.1 })
          customAnimation.to( 0.2, this.body.scale, { y: 1, x: 1, z: 1, delay: 0.2 })
        }
      }
    reset(){
        this.stop()
        this.obj.rotation.x = 0
        this.obj.rotation.z = 0
        this.obj.position.set( 
            BottleConfs.initPosition.x,
            BottleConfs.initPosition.y + 30,
            BottleConfs.initPosition.z)
    }
}
export default new Bottle()