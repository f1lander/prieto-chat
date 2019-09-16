import io from "socket.io-client";
import { IChatMessage } from "../types";
import { fromEvent, Observable } from "rxjs";

export class SocketService {
  private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;

  public init(): SocketService {
    this.socket = io("localhost:8080");
    return this;
  }

  public send(message: IChatMessage): void {
    console.log("emitting message: " + message);
    this.socket.emit("message", message);
  }

  public onMessage(): Observable<IChatMessage> {
    return fromEvent(this.socket, "message");
  }

  public disconnect(): void {
    this.socket.disconnect();
  }
}
