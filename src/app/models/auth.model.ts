export interface ResponseLogin {
  access_token: string;
  refresh_token: string;
}
export interface RespLogin {
  message: string;
  token: string;
  data: LoginData;
  result: boolean;
}
export interface LoginData {
  username: string;
}
