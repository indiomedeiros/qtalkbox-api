import { PostDatabaseModel } from "../models/Post";
import BaseDatabase from "./BaseDatabase";

export default class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    
    public insertPost = async (post: PostDatabaseModel): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
        .insert(post)
    }
}