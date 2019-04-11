import AudioConfs from "../../confs/audio-confs"
import GameView from '../game/view'
class AudioManager{
    constructor(){
        this.init()
    }
    init(){
        for(let key in AudioConfs.audioSources){
            this[key] = wx.createInnerAudioContext();
            this[key].src = AudioConfs.audioSources[key]
        }
        this.shrink_end.loop = true
        this.shrink.onEnded(()=>{
            if(GameView.gamePage.bottle.status == 'shrink'){
                this.shrink_end.play()
            }
        })
    }
}
export default new AudioManager()