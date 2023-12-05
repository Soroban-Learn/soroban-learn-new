import * as Yup from 'yup';
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
  usernameRequiredError,
} from '@/utils/constants';

export const registrationSchema = Yup.object({
  email: Yup.string()
    .email()
    .matches(emailRegex, emailRegexpError)
    .required(emailRequiredError),
  username: Yup.string().required(usernameRequiredError),
  password: Yup.string()
    .min(8, passwordLengthError)
    .matches(/[0-9]/, passwordDigitError)
    .matches(/[a-z]/, passwordLowercaseError)
    .matches(/[A-Z]/, passwordUppercaseError)
    .required(passwordRequiredError),
  passwordConfirm: Yup.string()
    .min(8, passwordLengthError)
    .matches(/[0-9]/, passwordDigitError)
    .matches(/[a-z]/, passwordLowercaseError)
    .matches(/[A-Z]/, passwordUppercaseError)
    .required(passwordRequiredError)
    .oneOf([Yup.ref('password')], passwordNotMatchError),
});

export type RegistrationSchema = Yup.InferType<typeof registrationSchema>;
