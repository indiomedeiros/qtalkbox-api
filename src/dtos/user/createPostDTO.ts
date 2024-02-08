import zod from "zod";

export interface CreatePostRequestDataDTO {
  token: string;
  content: string;
}

export const CheckCreatePostRequestData = zod
  .object({
    token: zod.string().min(17),
    content: zod.string().min(8),
  })
  .transform((data) => data as CreatePostRequestDataDTO);
