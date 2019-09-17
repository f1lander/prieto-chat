import * as express from "express";
import * as socketIo from "socket.io";
import { ChatEvent, PRIETO_BOOT_BAD_REQUEST } from "../utils/constants";
import { ChatMessage } from "../utils/types";
import { createServer, Server } from "http";
import StooqBot from "./stooq-bot";
import * as cors from "cors";
require("dotenv").config();

export class ChatServer {
  public static readonly PORT: number = 8080;
  private _app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;
  private _stooqBot: StooqBot;

  constructor() {
    this._app = express();
    this.port = process.env.PORT || ChatServer.PORT;
    this._app.use(cors());
    this._app.options("*", cors());
    this.server = createServer(this._app);
    this.initSocket();
    this.listen();
    this._stooqBot = new StooqBot();
  }

  private initSocket(): void {
    this.io = socketIo(this.server);
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log("Running server on port %s", this.port);
    });

    this.io.on(ChatEvent.CONNECT, (socket: any) => {
      console.log("Connected client on port %s.", this.port);

      socket.on(ChatEvent.MESSAGE, async (m: ChatMessage) => {
        console.log("[server](message): %s", JSON.stringify(m));

        m.timestamp = new Date();
        this.io.emit(ChatEvent.MESSAGE, m);
        // parse the message

        try {
          const parsedMessage = await this._stooqBot.parseCommand(m);
          // if is not null call the GET request
          if (parsedMessage) {
            const csvData = await this._stooqBot.getStooqCsv(parsedMessage);
            const parsedCsv = this._stooqBot.parseCsv(csvData.data);
            this.io.emit(ChatEvent.MESSAGE, parsedCsv);
          }
        } catch (error) {
          this.io.emit(ChatEvent.MESSAGE, error);
        }
      });

      socket.on(ChatEvent.DISCONNECT, () => {
        console.log("Client disconnected");
      });
    });
  }

  get app(): express.Application {
    return this._app;
  }
}
