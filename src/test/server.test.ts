import { SimpleWsClient } from "../classes/simpleClient";

const client = new SimpleWsClient("ws://localhost:8080");

client.on("open", () => {
    console.log("conexão iniciada")
})

const client1 = new SimpleWsClient("ws://localhost:8080");

client1.on("open", () => {
    console.log("conexão iniciada")
})

const client2 = new SimpleWsClient("ws://localhost:8080");

client2.on("open", () => {
    console.log("conexão iniciada")
})

const client3 = new SimpleWsClient("ws://localhost:8080");

client3.on("open", () => {
    console.log("conexão iniciada")
})

const client4 = new SimpleWsClient("ws://localhost:8080");

client4.on("open", () => {
    console.log("conexão iniciada")
})