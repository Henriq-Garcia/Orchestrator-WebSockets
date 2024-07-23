import { SimpleWsClient } from "../classes/simpleClient";

const client = new SimpleWsClient("ws://localhost:8080");

client.on("open", () => {
    console.log("conexão iniciada")
})