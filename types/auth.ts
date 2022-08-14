export interface IAuthResponse {
  message: string;
  token: string;
}

export interface IAuth {
  user: string;
  login: (data: string) => Promise<void>;
  logout: () => void;
}