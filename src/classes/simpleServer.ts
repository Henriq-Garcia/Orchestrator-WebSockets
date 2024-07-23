import { IncomingMessage } from "http";
import WebSocket, { ServerOptions, WebSocketServer } from "ws";

export class SimpleWsServer extends WebSocketServer {
    private _maxConnection: number;
    private _connections: number = 0;

    constructor(options: ServerOptions, maxConnections: number) {
        super(options);
        this._maxConnection = maxConnections;
    }

    allowNewConnection() {
        if (this._connections >= this._maxConnection) return false;
        return true;
    }

    pushConnection(ws: WebSocket, request: IncomingMessage) {
        ws.send("ola cliente, seja bem vindo")
        this._connections++
        ws.on("close", () => {
            this._connections--
        })
    }
}