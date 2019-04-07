import { scene } from "../scene/index"
import Cuboid from "../block/cuboid"
import Cylinder from "../block/cylinder" 
import ground from "../objects/ground"
import bottle from "../objects/bottle"
export default class GamePage{
    constructor(callbacks){
        this.callbacks = callbacks
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
        canvas.addEventListener('touchstart',this.touchStartCallback)
        canvas.addEventListener('touchend', this.touchEndCallback)
    }
    removeTouchEvent(){
        canvas.removeEventListener('touchstart', this.touchStartCallback)
        canvas.removeEventListener('touchend', this.touchEndCallback)
    }
    touchStartCallback(){
        console.log("touchstart")
    }
    touchEndCallback(){
        console.log("touchend")
    }
    render(){
        this.scene.render()
        if(this.bottle)
        {
            this.bottle.update()
        }
        requestAnimationFrame(this.render.bind(this))
    }
    addGround(){
        this.scene.instance.add(this.ground.instance)
        this.bottle.showUp()
    }
    addInitBlock(){
        const cuboidBlock = new Cuboid(-15, 0, 0)
        const cylinderBlock = new Cylinder(23, 0, 0)
        this.scene.instance.add(cuboidBlock.instance)
        this.scene.instance.add(cylinderBlock.instance)
    }
    addBottle(){
        this.scene.instance.add(this.bottle.obj)
    }   
}
 