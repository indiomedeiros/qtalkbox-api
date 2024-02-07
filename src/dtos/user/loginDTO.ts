import zod from "zod";

export interface LoginRequestDataDTO {
  email: string;
  password: string;
}

export interface LoginResponseDataDTO {
  token: string;
}

export const CheckLoginRequestData = zod
  .object({
    email: zod.string().email(),
    password: zod.string().min(8),
  })
  .transform((data) => data as LoginRequestDataDTO);
