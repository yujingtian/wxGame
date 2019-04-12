import BaseBlock from "./base"
import utils from "../utils/index"

export default class Cubiod extends BaseBlock{
    constructor(x, y, z, name, width){
        super('cuboid')
        this.loader = new THREE.TextureLoader()
        const size = width || this.width
        //const geometry = new THREE.BoxBufferGeometry(size, this.height, size)  
        if(name == "color"){

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