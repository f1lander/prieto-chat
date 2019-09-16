export interface IChatMessage {
  author: string;
  message: string;
}
export interface IChatState {
  input: string;
  messages: IChatMessage[];
}

export interface ILoginState {
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  password: string;
  nickName: string;
}
