import BottleConfs from "../../confs/bottle.confs"
import BlockConfs from "../../confs/block-confs"
import { customAnimation } from "../../libs/animation"
class Bottle{
    constructor(){
        this.direction = 0
        this.axis = null
    }
    init(){
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

        this.bottom.add(this.human)

        this.bottle.position.x = 0
        this.bottle.position.y = 2.3
        this.bottle.position.z = 0 
        
        this.obj.add(this.bottle)
    }
    update(){
       this.head.rotation.y += 0.06 
    }
    showUp(){
        customAnimation.to(0.5, this.obj.position, {
            x:BottleConfs.initPosition.x,
            y:BottleConfs.initPosition.y + BlockConfs.height / 2,
            z:BottleConfs.initPosition.z
        },"BounceEaseOut")
    }
    setDirection(direction, axis){
        this.direction = direction
        this.axis = axis
    }
    rotate(){
        const scale = 1.4
        this.human.rotation.z = this.human.rotation.x = 0
        if(this.direction == 0){//x
            customAnimation.to(this.human.rotation, 0.14, {z:this.human.rotation.z - Math.PI})
            customAnimation.to(this.human.rotatton, 0.18, {z:this.human.rotation.z - 2 * Math.PI},'Linear',0.14)
        }
        else if(this.direction == 1){//y 
            
        }
    }    
}
export default new Bottle()