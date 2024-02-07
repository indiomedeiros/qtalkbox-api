import zod from "zod";

export interface SignupRequestDataDTO {
  nickname: string;
  email: string;
  password: string;
}

export interface SignupResponseDataDTO {
  token: string;
}

export const CheckSignupRequestData = zod
  .object({
    nickname: zod.string().min(3),
    email: zod.string().email(),
    password: zod.string().min(8),
  })
  .transform((data) => data as SignupRequestDataDTO);
