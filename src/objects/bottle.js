import BottleConfs from "../../confs/bottle.confs"
class Bottle{
    constructor(){

    }
    init(){
        this.obj = new THREE.Object3D()
        this.obj.name = "bottle"
        this.obj.position.set(
            BottleConfs.initPosition.x,
            BottleConfs.initPosition.y + 30,
            BottleConfs.initPosition.z)
        
        this.bottle = new THREE.Object3D()
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
            new THREE.OctahedronGeometry(headRadius / 1.2),
            basicMaterial
        )
        this.head.castShadow = true
        this.head.position.x = 0
        this.head.position.y = 3.57143 * headRadius
        this.head.position.z = 0 

        this.bottle.add(this.head)
        this.bottle.add(this.body)
        this.obj.add(this.bottle)
    }
}
export default new Bottle()