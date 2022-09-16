import socket from "./index"

class Emit extends socket{

    public emit(evnetName:string,arg:any){
        this.socket.emit(evnetName,arg)
        // if (this.socket !== null){
        // }
    }
}

export default Emit