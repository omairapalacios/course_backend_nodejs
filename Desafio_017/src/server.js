import { ServerIO } from "socket.io";
import { HttpServer } from "http";
import parseArgs from "minimist";
import cluster from "cluster";
import { fork } from "child_process";
import * as os from "os";
import { createApp } from "./app";
import { setupIo } from "./socketSetup";

const { port, mode, child } = parseArgs(process.argv.slice(2));
console.log(process.argv);
console.log(parseArgs(process.argv.slice(2)));
const PORT = port || 8080;

// Server config
const createServer = () => {
  const server = new HttpServer(createApp());
  const io = new ServerIO(server);
  setupIo(io);
  server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  server.on("error", (error) => console.log(`Error en servidor ${error}`));
};

const numCPUs = os.cpus().length;

if (mode === "FORK") {
  if (child) {
    createServer();
  } else {
    for (let i = 0; i < numCPUs; i++) {
      const childPort = PORT ? PORT + i : 8080 + i;
      fork(__dirname + "/main.js", [
        "--port",
        childPort,
        "--mode",
        "FORK",
        "--child",
      ]);
    }
  }
}

if (mode === "CLUSTER") {
  if (cluster.isPrimary) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  } else {
    createServer(PORT);
    console.log(`Worker ${process.pid} started`);
  }
}

if (mode == "EXTERNAL") createServer(PORT);
