import { IncomingMessage } from "http";
import WebSocket, { ServerOptions, WebSocketServer } from "ws";
import { SimpleWsServer } from "./simpleServer";

export class Orchestrator extends WebSocketServer {
    private _ports: number[] = [];
    private _childSockets: SimpleWsServer[] = [];

    constructor(options: ServerOptions, ports: number[]) {
        super(options);
        this._ports = ports;
        this.createServers(ports);
        this.on("connection", this.redirectOnConnection)
    }

    private redirectOnConnection(ws: WebSocket, request: IncomingMessage) {
        for (let serverIndex = 0; serverIndex < this._childSockets.length; serverIndex++) {
            const server = this._childSockets[serverIndex];
            const port = this._ports[serverIndex];
            const allowed = server.allowNewConnection();
            if (!allowed) continue;
            console.log("redirecionando para a a porta", port);
            server.pushConnection(ws, request);
            break;
        };
    }

    private createServers(ports: number[]) {
        ports.forEach((port) => {
            const server = new SimpleWsServer({port: port}, 2);
            this._childSockets.push(server);
        })
    }
}