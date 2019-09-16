import { ChatMessage } from "./types";

export enum ChatEvent {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  MESSAGE = "message"
}

export const PRIETO_BOOT: ChatMessage = {
  author: "Prieto Stooq-Bot🤖",
  message:
    "I can't understand this command, please try something like /stock_quote=<stock_code>"
};
