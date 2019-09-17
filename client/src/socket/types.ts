export interface ChatMessage {
  author: string;
  message: string;
  timestamp?: Date;
}
export interface ChatState {
  input: string;
  messages: ChatMessage[];
  author: string;
}
