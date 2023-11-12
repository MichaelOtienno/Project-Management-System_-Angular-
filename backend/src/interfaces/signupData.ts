import { Request } from "express"

export interface SignupData {
    userName: string;
    email: string;
    phone_no: string;
    password: string;
  }
  

  export interface signupUser extends Request{
    email:string,
    pass:string
}