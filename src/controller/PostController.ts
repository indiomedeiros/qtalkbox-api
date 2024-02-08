import { Request, Response } from "express";
import { CheckCreatePostRequestData } from "../dtos/user/createPostDTO";
import { ZodError } from "zod";
import BaseError from "../errors/BaseError";
import PostBusiness from "../business/PostBusiness";

export default class PostController {
  constructor(private postBusiness: PostBusiness) {}
  public createPost = async (req: Request, res: Response) => {
    try {
      const requestData = CheckCreatePostRequestData.parse({
        token: req.headers.authorization,
        content: req.body.content,
      });
      await this.postBusiness.createPost(requestData);

      res.status(201).send({ message: "The post was created successfully!" });
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Something unexpected happened.");
      }
    }
  };
}
