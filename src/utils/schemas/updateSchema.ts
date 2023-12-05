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

export const updateSchema = Yup.object().shape(
  {
    email: Yup.string()
      .email()
      .matches(emailRegex, emailRegexpError)
      .required(emailRequiredError),
    username: Yup.string().required(usernameRequiredError),
    password: Yup.string().when('password', (value: string[]) => {
      if (value[0] !== '') {
        return Yup.string()
          .min(8, passwordLengthError)
          .matches(/[0-9]/, passwordDigitError)
          .matches(/[a-z]/, passwordLowercaseError)
          .matches(/[A-Z]/, passwordUppercaseError);
      } else {
        return Yup.string().nullable().notRequired();
      }
    }),
    passwordConfirm: Yup.string().when(['password', 'email'], {
      is: (password: any) => !!password,
      then: (schema) =>
        schema
          .required(passwordRequiredError)
          .oneOf([Yup.ref('password')], passwordNotMatchError),
      otherwise: (schema) => schema.notRequired(),
    }),

    avatar: Yup.string().optional().nullable(),
  },
  [['password', 'password']]
);

export type UpdateSchema = Yup.InferType<typeof updateSchema>;
