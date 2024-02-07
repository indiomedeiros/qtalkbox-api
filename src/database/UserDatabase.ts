import { UserDatabaseModel } from "../models/User";
import BaseDatabase from "./BaseDatabase";

export default class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "users";

  public checkEmailOnDB = async (
    email: string
  ): Promise<UserDatabaseModel | undefined> => {
    const [userDB] = await BaseDatabase.connection(UserDatabase.TABLE_USERS)
      .select()
      .where({ email: email });
    return userDB;
  };

  public insertUserOnDB = async (userDB: UserDatabaseModel): Promise<void> => {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(userDB);
  };
}
