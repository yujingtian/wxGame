import camera from "./camera"
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
        this.axesHelper = new THREE.AxesHelper( 100 );
        this.camera = camera
        this.camera.init()
        this.instance.add(this.camera.instance)
        this.instance.add(this.axesHelper)
    }
    render(){
        this.renderer.render(this.instance, this.camera.instance)
    }
}

export default new Scene()