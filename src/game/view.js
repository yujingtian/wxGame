import GamePage from "../pages/game-page"
import GameOverPage from "../pages/game-over-page"
class GameView {
    constructor(){

    }
    showGameOverPage(){
        this.gamePage.hide()
        this.GameOverPage.show()
    }
    showGamePage(){
        this.GameOverPage.hide()
        this.gamePage.restart()
        this.gamePage.show()
    }
    restartGame(){
        this.gamePage.restart()
    }

    initGameOverPage(callbacks){
        this.gameOverPage = new GameOverPage(callbacks)
        this.gameOverPage.init({
            scene:this.gamePage.scene.instance
        })
    }

    initGamePage(callbacks){
        this.gamePage = new GamePage(callbacks)
        this.gamePage.init()
    }
}
export default new GameView()