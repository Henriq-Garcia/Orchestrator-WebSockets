import WebSocket from "ws";

export class SimpleWsClient extends WebSocket{

    constructor(url: string) {
        super(url)
        this.on("message", (message) => {
            try{
                const parsedMessage = JSON.parse(message.toString());
                return this.emit(parsedMessage.event, parsedMessage.data);
            } catch(_) {
                return console.log(message.toString());
            }
        });
    }
}