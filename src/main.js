// import Player     from './player/index'
// import Enemy      from './npc/enemy'
// import BackGround from './runtime/background'
// import GameInfo   from './runtime/gameinfo'
// import Music      from './runtime/music'
// import DataBus    from './databus'
import * as THREE from "../libs/three.js";
window.THREE = THREE
import game from "./game/game"
/**
 * 游戏主函数
 */
class Main {
  constructor() {
    
  }
  init(){
    game.init()
  }
}

export default new Main()
