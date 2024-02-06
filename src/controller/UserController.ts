import { Request, Response } from "express";
import UserBusiness from "../business/UserBusiness";
import BaseError from "../errors/BaseError";
import { ZodError } from "zod";
import { CheckSignupRequestData } from "../dtos/user/signupDTO";

export default class UserController {
  constructor(private userBusiness: UserBusiness) {}
  
  public signup = async (req: Request, res: Response) => {
    try {
      const requestData = CheckSignupRequestData.parse({
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password,
      });

      const response = await this.userBusiness.signup(requestData);

      res.status(201).send(response);
    } catch (error: any) {
      console.log(error);
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Aconteceu algo inesperado");
      }
    }
  };
}
