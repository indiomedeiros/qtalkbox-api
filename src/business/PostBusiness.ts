import PostDatabase from "../database/PostDatabase";
import { CreatePostRequestDataDTO } from "../dtos/user/createPostDTO";
import UnautorizedError from "../errors/UnautorizedError";
import { Post } from "../models/Post";
import IdGenerator from "../services/IdGenerator";
import TokenManager from "../services/TokenManager";

export default class PostBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private postDatabase: PostDatabase
    ) { }

    public createPost = async (
        requestData: CreatePostRequestDataDTO
    ): Promise<void> => {
        const { token, content } = requestData;
        const payload = this.tokenManager.getPayload(token);

        if (!payload) {
            throw new UnautorizedError();
        }

        const id = this.idGenerator.generator();
        const post = new Post(
            id,
            content,
            0,
            0,
            new Date().toISOString(),
            payload.id,
            payload.nickname
        );

        await this.postDatabase.insertPost(post.toDatabaseModel());
    };
}
