import { IncomingMessage } from "http";
import WebSocket, { ServerOptions, WebSocketServer } from "ws";
import { SimpleWsServer } from "./simpleServer";
import * as net from "net"

export class Orchestrator extends WebSocketServer {
    private _ports: number[] = [];
    private _childSockets: SimpleWsServer[] = [];

    constructor(options: ServerOptions, ports: number[]) {
        super(options);
        this._ports = ports;
        this._ports.forEach((port) => {this.createServer(port)});
        this.on("connection", this.redirectOnConnection)
    }

    private redirectOnConnection(ws: WebSocket, request: IncomingMessage) {
        let redirected = false
        for (let serverIndex = 0; serverIndex < this._childSockets.length; serverIndex++) {
            const server = this._childSockets[serverIndex];
            const port = this._ports[serverIndex];
            const allowed = server.allowNewConnection();
            if (!allowed) continue;
            console.log("redirecionando para a a porta", port);
            server.pushConnection(ws, request);
            redirected = true;
            return;
        };
        this.unableToRedirect(ws, request)
    }

    private async unableToRedirect(ws: WebSocket, request: IncomingMessage) {
        let attempts = 0;
        const maxAttempts = 10;
        while (attempts < maxAttempts) {
            attempts++;
            const port = this.randomPort();
            try {
                const available = await this.checkPort(port);
                if (available) {
                    console.log("Found available port", port);
                    this._ports.push(port);
                    this.createServer(port);
                    const newServer = this._childSockets[this._childSockets.length - 1];
                    newServer.pushConnection(ws, request);
                    return;
                }
            } catch (err) {
                console.error("Error checking port", err);
            }
        }
        console.error("Unable to redirect connection: no available ports found.");
        ws.close(1001, "No available ports to redirect connection.");
    }

    private randomPort() {
        return Math.floor(Math.random() * (65535 - 1024 + 1)) + 1024;
    }

    private checkPort(port: number) {
        return new Promise((resolve, reject) => {
            const server = net.createServer();
            server.once("error", (err) => {
                if (err.message === "EADDRINUSE") {
                    resolve(false);
                } else {
                    reject(err);
                }
            });
            server.once("listening", () => {
                server.close();
                resolve(true);
            });
            server.listen(port);
        });
    }

    private createServer(port: number) {
        const server = new SimpleWsServer({port: port}, 1);
        this._childSockets.push(server);
    }
}