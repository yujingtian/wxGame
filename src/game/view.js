import GamePage from "../pages/game-page"
import GameOverPage from "../pages/game-over-page"
class GameView {
    constructor(){

    }
    showGameOverPage(){
        this.gamePage.hide()
        this.gameOverPage.show()
    }
    showGamePage(){
        this.gameOverPage.hide()
        this.gamePage.restart()
        this.gamePage.show()
    }

    initGameOverPage(callbacks){
        this.gameOverPage = new GameOverPage(callbacks)
        this.gameOverPage.init({
            scene:this.gamePage.scene.instance,
            camera: this.gamePage.scene.camera.instance
        })
    }

    initGamePage(callbacks){
        this.gamePage = new GamePage(callbacks)
        this.gamePage.init()
    }
}
export default new GameView()