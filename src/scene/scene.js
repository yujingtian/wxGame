import camera from "./camera"
import light from "./light"
import background from "../objects/background"
class Scene {
    constructor(){
        this.instance = null
    }
    init(){
        this.instance = new THREE.Scene()
        const renderer = this.renderer = new THREE.WebGLRenderer({
            canvas:canvas,
            antialias:true ,
            perserveDrawingBuffer: true
        })

        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFShadowMap

        this.axesHelper = new THREE.AxesHelper( 100 );
        this.camera = camera
        this.light = light
        this.light.init()
        this.camera.init()
        this.instance.add(this.camera.instance)
        this.instance.add(this.axesHelper)
        for(let lightType in this.light.instances){
            this.instance.add(this.light.instances[lightType])
        }

        this.background = background
        this.background.init()
        this.background.instance.position.z = -84
        this.camera.instance.add(this.background.instance)
    }
    render(){
        this.renderer.render(this.instance, this.camera.instance)
    }
}

export default new Scene()