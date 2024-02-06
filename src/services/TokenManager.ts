import { PayloadModel } from "../models/User";
import jwt from "jsonwebtoken";

export default class TokenManager {
  public createToken = (payload: PayloadModel): string => {
    const token = jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  };
  public getPayload = (token: string): PayloadModel | null => {
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY as string);
      return payload as PayloadModel;
    } catch (error) {
      return null;
    }
  };
}
