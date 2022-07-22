export interface IUser {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}
export interface IUserResponse {
  id: string;
  login: string;
  age: number;
  isDeleted: boolean;
}
export interface IQuery {
  loginSubstring: string;
  limit: number;
}
