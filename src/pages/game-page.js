import { scene } from "../scene/index"
import Cuboid from "../block/cuboid"
import Cylinder from "../block/cylinder" 
import ground from "../objects/ground"
import bottle from "../objects/bottle"
export default class GamePage{
    constructor(callbacks){
        this.callbacks = callbacks
        this.targetPosition = {}
    }

    show(){
        
    }

    hide(){

    }

    restart(){
        console.log("game page restart")
    }

    init(){
        this.scene = scene
        this.ground = ground
        this.bottle = bottle
        console.log(this.bottle)
        this.scene.init()
        this.ground.init()
        this.bottle.init()
        this.addInitBlock()
        this.addGround()
        this.addBottle()
        this.bindTouchEvent()
        this.render()
    }
    bindTouchEvent(){
        canvas.addEventListener('touchstart', this.touchStartCallback)
        canvas.addEventListener('touchend', this.touchEndCallback)
    }
    removeTouchEvent(){
        canvas.removeEventListener('touchstart', this.touchStartCallback)
        canvas.removeEventListener('touchend', this.touchEndCallback)
    }
    touchStartCallback = () => {
        console.log("touchstart");
        this.touchStartTime = Date.now()
        this.bottle.shrink()
        this.currentBlock.shrink()
    }
    touchEndCallback = () => {
        console.log("touchend");
        this.touchEndTime = Date.now()
        const duration = this.touchEndTime - this.touchStartTime 
        this.bottle.velocity.vx = Math.min(duration / 6, 400)
        this.bottle.velocity.vx = +this.bottle.velocity.vx.toFixed(2)
        this.bottle.velocity.vy = Math.min(150 + duration / 20, 400)
        this.bottle.velocity.vy = +this.bottle.velocity.vy.toFixed(2)
        //this.state = 'jump'
        //this.bottle.stop()
        this.currentBlock.rebound()
        this.bottle.rotate()
        this.bottle.jump(duration)
    }

    setDirection(direction){
        const currentPosition = {
            x:this.bottle.obj.position.x,
            z:this.bottle.obj.position.z,
        }
        this.axis = new THREE.Vector3(this.targetPosition.x - currentPosition.x, 0, this.targetPosition.z - currentPosition.z )
        this.axis.normalize()
        this.bottle.setDirection(direction, this.axis)
    }

    render(){
        if(this.currentBlock)
        {
            this.currentBlock.update()
        }
        if(this.bottle)
        {
            this.bottle.update()
        }
        this.scene.render()
        
        requestAnimationFrame(this.render.bind(this))
    }
    addGround(){
        this.scene.instance.add(this.ground.instance)
        this.bottle.showUp()
    }
    addInitBlock(){
        const cuboidBlock = this.currentBlock =  new Cuboid(-15, 0, 0)
        const cylinderBlock = new Cylinder(23, 0, 0)
        this.targetPosition = {
            x:23,
            y:0,
            z:0
        }
        const initDirection = 0
        this.scene.instance.add(cuboidBlock.instance)
        this.scene.instance.add(cylinderBlock.instance)
        this.setDirection(initDirection)
    }
    addBottle(){
        this.scene.instance.add(this.bottle.obj)
    }   
}
 