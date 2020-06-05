import BaseBlock from "./base"
import BlockConfs from "../../confs/block-confs"

export default class Cylinder extends BaseBlock{
    constructor(x, y, z, name, width){
        super('Cylinder')
        const size = width || this.width
        // const geometry = new THREE.CylinderBufferGeometry(size/2 , size/2, this.height, 120)  
        // const material = new THREE.MeshPhongMaterial({
        //     color:0xffffff
        // })
        if(name == "color"){
            let currentColor
            const seed = Math.floor(Math.random()*6)
            switch(seed){
                case 0:
                currentColor = BlockConfs.color.orange
                break;
                case 1:
                currentColor = BlockConfs.color.orangeDark
                break;
                case 2:
                currentColor = BlockConfs.color.green
                break;
                case 3:
                currentColor = BlockConfs.color.blue
                break;
                case 4:
                currentColor = BlockConfs.color.yellow
                break;
                case 5:
                currentColor = BlockConfs.color.purple
                break;
                default:
            }
            const innerMaterial = new THREE.MeshLambertMaterial({color:BlockConfs.color.white}) 
            const outerMaterial = new THREE.MeshLambertMaterial({color:currentColor})

            const innerHeight = 3
            const outerHeight = (BlockConfs.height - innerHeight) / 2
            const outerGeometry = new THREE.CylinderBufferGeometry(size/2 , size/2, outerHeight, 120)
            const innerGeometry = new THREE.CylinderBufferGeometry(size/2 , size/2, innerHeight, 120)

            const totalMesh = new THREE.Object3D()
            const topMesh = new THREE.Mesh(outerGeometry, outerMaterial)
            topMesh.position.y = (innerHeight + outerHeight) / 2
            topMesh.receiveShadow = true
            topMesh.castShadow = true
            const middleMesh = new THREE.Mesh(innerGeometry, innerMaterial)
            middleMesh.position.y = 0
            middleMesh.receiveShadow = true
            middleMesh.castShadow = true
            const bottomMesh = new THREE.Mesh(outerGeometry, outerMaterial)
            bottomMesh.position.y = -(innerHeight + outerHeight) / 2
            bottomMesh.receiveShadow = true
            bottomMesh.castShadow = true
            totalMesh.add(topMesh)
            totalMesh.add(middleMesh)
            totalMesh.add(bottomMesh)
            this.instance = totalMesh
        }
        //this.instance = new THREE.Mesh(geometry, material) 
        this.instance.receiveShadow = true 
        this.instance.name = 'block'
        this.x = x
        this.y = y
        this.z = z
        this.instance.castShadow = true
        this.popup()
        // this.instance.position.x = this.x
        // this.instance.position.y = this.y
        // this.instance.position.z = this.z
    }
}