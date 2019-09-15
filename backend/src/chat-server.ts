import * as express from "express";
import * as socketIo from "socket.io";
import * as cors from "cors";
import { createServer, Server } from "http";
import { ChatEvent } from "./constant";
import { ChatMessage } from "./types";
require("dotenv");

export class ChatServer {
  public static readonly PORT: number = 8081;
  private _app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;

  constructor() {
    this._app = express();
    this.port = process.env.PORT || ChatServer.PORT;
    this._app.use(cors());
    this._app.options("*", cors());
    this.server = createServer(this._app);
    this.initSocket();
    this.listen();
  }

  get app(): express.Application {
    return this._app;
  }

  private listen(): void {
    // start the server on the port defined
    this.server.listen(this.port, () => {
      console.log(`Running Server on port ${this.port}`);
    });

    // define the events

    this.io.on(ChatEvent.CONNECT, (socket: any) => {
      console.log(`Client connected on port ${this.port}`);

      this.io.on(ChatEvent.MESSAGE, (msj: ChatMessage) => {
        console.log(`[server](message): ${JSON.stringify(msj)}`);
        this.io.emit(ChatEvent.MESSAGE, msj);
      });

      this.io.on(ChatEvent.DISCONNECT, () => {
        console.log("[server] client disconnected");
      });
    });
  }

  private initSocket(): void {
    this.io = socketIo(this.server);
  }
}
