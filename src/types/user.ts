import { Wallet } from "./wallet";

export interface User {
    id: string;
    name: string;
    email: string;
    wallet: Wallet;
  }
  export interface UserData {
    user: User;
  }
  
  export interface VariablesUser {
    id: string;
  }