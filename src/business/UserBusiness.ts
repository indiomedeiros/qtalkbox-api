import { response } from "express";
import UserDatabase from "../database/UserDatabase";
import {
  LoginRequestDataDTO,
  LoginResponseDataDTO,
} from "../dtos/user/loginDTO";
import {
  SignupRequestDataDTO,
  SignupResponseDataDTO,
} from "../dtos/user/signupDTO";
import BadRequestError from "../errors/BadRequestError";
import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";
import { PayloadModel, User } from "../models/User";
import HashManager from "../services/HashManager";
import IdGenerator from "../services/IdGenerator";
import TokenManager from "../services/TokenManager";

export default class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private tokenManager: TokenManager
  ) {}

  public signup = async (
    requestData: SignupRequestDataDTO
  ): Promise<SignupResponseDataDTO> => {
    const { nickname, password, email } = requestData;

    const userRegisteredOnDatabase = await this.userDatabase.checkEmailOnDB(
      email
    );

    if (userRegisteredOnDatabase) {
      throw new ConflictError("Registered email.");
    }

    const id = this.idGenerator.generator();
    const encryptedPassword = await this.hashManager.hash(password);
    const user = new User(id, nickname, email, encryptedPassword);

    await this.userDatabase.insertUserOnDB(user.getDatabaseModel());
    const payload: PayloadModel = {
      id: user.getId(),
      nickname: user.getNickname(),
    };
    const response: SignupResponseDataDTO = {
      token: this.tokenManager.createToken(payload),
    };

    return response;
  };

  public login = async (
    requestData: LoginRequestDataDTO
  ): Promise<LoginResponseDataDTO> => {
    const { password, email } = requestData;

    const userRegisteredOnDatabase = await this.userDatabase.checkEmailOnDB(
      email
    );

    if (!userRegisteredOnDatabase) {
      throw new NotFoundError("Email was not found.");
    }

    const passwordValidation = await this.hashManager.compare(
      password,
      userRegisteredOnDatabase.password
    );

    if (!passwordValidation) {
      throw new BadRequestError("Incorrect password.");
    }

    const user = new User(
      userRegisteredOnDatabase.id,
      userRegisteredOnDatabase.nickname,
      userRegisteredOnDatabase.email,
      userRegisteredOnDatabase.password
    );

    const payload: PayloadModel = {
      id: user.getId(),
      nickname: user.getNickname(),
    };

    const response: LoginResponseDataDTO = {
      token: this.tokenManager.createToken(payload),
    };

    return response;
  };
}
