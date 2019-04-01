class Event{
    constructor( sender ){
        this._sender = sender
        this._listeners = []
    }

    attach(callback){
        this._listeners.push(callback)
    }

    notify(args){
        for(let i=0; i<this._listeners; i++)
        {
            this._listeners[i](this.sender, args)
        }
    }
}

export default Event