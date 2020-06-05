import BaseBlock from "./base"
import utils from "../utils/index"
import BlockConfs from "../../confs/block-confs"

export default class Cubiod extends BaseBlock{
    constructor(x, y, z, name, width){
        super('cuboid')
        this.loader = new THREE.TextureLoader()
        const size = width || this.width
        //const geometry = new THREE.BoxBufferGeometry(size, this.height, size)  
        if(name == "color"){
            let currentColor
            const seed =Math.floor(Math.random() * 6)
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
            const outerGeometry = new THREE.BoxGeometry(size, outerHeight, size)
            const innerGeometry = new THREE.BoxGeometry(size, innerHeight, size)

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
        } else if(name == "well"){
            const geometry = new THREE.BoxGeometry(size, this.height, size)  
            const material = new THREE.MeshLambertMaterial({
                map:this.loader.load('res/images/well.png')
            })
            utils.mapUv(280, 428, geometry, 1, 0, 0, 280, 148)   //front
            utils.mapUv(280, 428, geometry, 2, 0, 148, 280, 428)  //top
            utils.mapUv(280, 428, geometry, 4, 0, 0, 280, 148, true) //right
            this.instance = new THREE.Mesh(geometry, material) 
        }
        // const material = new THREE.MeshPhongMaterial({
        //     color:0xffffff
        // })
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