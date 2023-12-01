import type { User } from "./User";

export interface ErrorResponse {
  error: any;
  message: string;
  success: boolean;
}

export interface UserRegistrationRequestParams {
  email: string;
  username: string;
  password: string;
}

export interface UserRegistratioResponseInfo extends User {
  access_token: string;
}

export interface UserRegistratioResponse {
  info: UserRegistratioResponseInfo;
  success: boolean;
}

export interface UserLoginRequestParams {
  email: string;
  password: string;
}

export interface UserLoginResponseInfo extends User {
  access_token: string;
}

export interface UserLoginResponse {
  auth: boolean;
  info: UserLoginResponseInfo;
}

export interface ForumResponse {
  userid: string;
  authtoken: string;
}
