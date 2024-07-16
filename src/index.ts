#!/usr/bin/env node

import cluster from "cluster";
import os from "os";
import app from "./app";
import debugLib from "debug";
import http from "http";

const debug = debugLib("bantu-lab-api:server");
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log("Starting a new worker");
    cluster.fork();
  });
} else {
  const port = normalizePort(process.env.PORT || "3000");
  app.set("port", port);

  const server = http.createServer(app);

  server.listen(port, () =>
    console.log(`Worker ${process.pid} running at http://localhost:${port}`)
  );

  server.on("error", onError);
  server.on("listening", onListening);

  function normalizePort(val: string): number | string | false {
    const port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
  }

  function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  function onListening(): void {
    const addr = server.address();
    const bind =
      typeof addr === "string" ? "pipe " + addr : "port " + (addr as any).port;
    debug("Listening on " + bind);
  }

  process.on("SIGINT", () => {
    console.log("SIGINT signal received: closing HTTP server");
    server.close(() => {
      console.log("HTTP server closed");
      process.exit(0);
    });
  });
}
