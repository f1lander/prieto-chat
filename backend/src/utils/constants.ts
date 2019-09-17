import { ChatMessage } from "./types";

export enum ChatEvent {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  MESSAGE = "message"
}

export const PRIETO_BOOT_DEFAULT: ChatMessage = {
  author: "Prieto Stooq-Bot🤖",
  message:
    "I can't understand this command, please try something like /stock_quote=<stock_code>",
  timestamp: new Date()
};

export const PRIETO_BOOT_BAD_REQUEST: ChatMessage = {
  author: "Prieto Stooq-Bot🤖",
  message: "Something get wrong with the request 🤔, try again",
  timestamp: new Date()
};
