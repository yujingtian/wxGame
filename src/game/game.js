import GameController from "./controller"
class Game{
    constructor(){
        this.GameController = GameController
    }
    init(){
        this.GameController.initPages()
    }
}

export default new Game()