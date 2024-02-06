import UserDatabase from "../database/UserDatabase";
import { SignupResponseDataDTO } from "../dtos/user/signupDTO";
import ConflictError from "../errors/ConflictError";
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

  public signup = async (requestData: any): Promise<SignupResponseDataDTO> => {
    const { nickname, password, email } = requestData;

    const result = await this.userDatabase.checkEmailOnDB(email);

    if (result) {
      throw new ConflictError("Email cadastrado");
    }

    const id = this.idGenerator.generator();
    const encryptedPassword = await this.hashManager.hash(password);
    const user = new User(id, nickname, email, encryptedPassword);

    await this.userDatabase.insertUserOnDB(user.getDatabaseModel());
    const payload: PayloadModel = {
      id: user.getId(),
      nickname: user.getNickname(),
    };
    const token: SignupResponseDataDTO = {
      token: this.tokenManager.createToken(payload),
    };

    return token;
  };
}
