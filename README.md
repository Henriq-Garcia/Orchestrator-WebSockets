# WebSocket Orchestrator

A scalable, yet simple, way to create multiple WebSocket servers to prevent server overload. Set a number of connections and watch it distribute the load efficiently.

## Features
- **Scalability**: Dynamically creates new WebSocket servers as needed.
- **Load Balancing**: Distributes connections across multiple servers to prevent overload.

## To Do
- [ ] Implement a way to handle dead servers and restart them
- [ ] Make it work with more WebSocket libraries

## Getting Started

### Prerequisites
Ensure you have Node.js installed.

### Installation
1. Clone this repository:
    ```sh
    git clone https://github.com/Henriq-Garcia/Orchestrator-WebSockets.git
    cd Orchestrator-WebSockets
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```

### Usage
1. Create your own WebSocket server. You can use the original `WebSocketServer` class from the `ws` library or implement the `SimpleWsServer` provided in this repository.
2. Start the server and client for testing:
    ```sh
    npm run test:server
    npm run test:client
    ```

### Example
Here’s a basic example to get you started:

```typescript
import { Orchestrator } from './orchestrator';

// Define server options and ports
const options = { port: 8080 };
const ports = [8081, 8082];

// Create an orchestrator instance
const orchestrator = new Orchestrator(options, ports);
```

