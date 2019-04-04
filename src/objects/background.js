import sceneConfs from "../../confs/scene-confs"
class Background{
    constructor(){
        
    }
    init(){
        const geometry = new THREE.PlaneGeometry(sceneConfs.frustumSize * 2,window.innerHeight / window.innerWidth * sceneConfs.frustumSize * 2 )
        const material = new THREE.MeshBasicMaterial({
            color:0xd7dbe6,
            opacity:1,
            transparent:true
        })
        this.instance = new THREE.Mesh(geometry, material)

    }
}

export default new Background()