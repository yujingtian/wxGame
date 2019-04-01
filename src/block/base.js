import blockConfs from '../../confs/block-confs'

export default class BaseBlock{
    constructor(type){
        this.type = type
        this.width = blockConfs.width
        this.height = blockConfs.height
    }
    
}