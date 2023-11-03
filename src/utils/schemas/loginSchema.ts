import * as Yup from "yup";
import {
  emailRegex,
  emailRequiredError,
  emailRegexpError,
  passwordRequiredError,
  passwordLengthError,
  passwordUppercaseError,
  passwordLowercaseError,
  passwordDigitError
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
        .min(8, passwordLengthError)
        .matches(/[0-9]/, passwordDigitError)
        .matches(/[a-z]/, passwordLowercaseError)
        .matches(/[A-Z]/, passwordUppercaseError)
        .required(passwordRequiredError),
  });

export type LoginSchema = Yup.InferType<typeof loginSchema>;
