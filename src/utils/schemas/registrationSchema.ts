import * as Yup from "yup";
import {
  emailRegex,
  usernameRegex,
  emailRegexpError,
  emailRequiredError,
  passwordRequiredError,
  passwordLengthError,
  passwordDigitError,
  passwordLowercaseError,
  passwordUppercaseError,
  passwordNotMatchError,
  firstNameRequiredError,
  lastNameRequiredError,
  usernameRegexpError,
  usernameRequiredError,
} from "@/utils/constants";

export const registrationSchema = Yup
  .object({
    firstName: Yup.string().required(firstNameRequiredError),
    lastName: Yup.string().required(lastNameRequiredError),
    username:
      Yup
        .string()
        .matches(usernameRegex, usernameRegexpError)
        .required(usernameRequiredError),
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
    passwordConfirm:
      Yup
        .string()
        .min(8, passwordLengthError)
        .matches(/[0-9]/, passwordDigitError)
        .matches(/[a-z]/, passwordLowercaseError)
        .matches(/[A-Z]/, passwordUppercaseError)
        .required(passwordRequiredError)
        .oneOf([Yup.ref("password")], passwordNotMatchError),
  });

export type RegistrationSchema = Yup.InferType<typeof registrationSchema>;
