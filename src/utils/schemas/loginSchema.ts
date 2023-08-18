import * as Yup from "yup";
import {
  emailRegex,
  emailRequiredError,
  emailRegexpError,
  passwordRequiredError,
} from "@/utils/constants";

export const loginSchema = Yup
  .object({
    email:
      Yup
        .string()
        .email()
        .matches(emailRegex, emailRegexpError)
        .required(emailRequiredError),
    password:
      Yup
        .string()
        .required(passwordRequiredError),
  });

export type LoginSchema = Yup.InferType<typeof loginSchema>;
