import * as Yup from 'yup';
import {
  emailRegex,
  emailRegexpError,
  emailRequiredError,
  passwordLengthError,
  passwordDigitError,
  passwordLowercaseError,
  passwordUppercaseError,
  passwordRequiredError,
  passwordNotMatchError,
  usernameRequiredError,
} from '@/utils/constants';

export const updationSchema = Yup.object().shape({
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
    .optional(),
  passwordConfirm: Yup.string().when('password', {
    is: (password: any) => !!password,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  }),
  avatar: Yup.string().optional(),
});

export type UpdateSchema = Yup.InferType<typeof updationSchema>;
