import { Static, Type } from '@sinclair/typebox';

export const AuthBaseSchema = Type.Box('auth', {
  username: Type.String({
    title: 'Username',
  }),
  email: Type.String({
    title: 'Email Address',
    pattern: '.+@.+\\..+',
  }),
  password: Type.String({
    title: 'Password',
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#?!@$%^&*-])[a-zA-Z\\d#?!@$%^&*-]{8,}$',
  }),
});

export const AuthLoginSchema = Type.Object({
  email: Type.Optional(Type.Ref(AuthBaseSchema, 'email')),
  username: Type.Ref(AuthBaseSchema, 'username'),
  password: Type.Ref(AuthBaseSchema, 'password'),
});
export interface ILoginBody extends Static<typeof AuthLoginSchema> {}

export const AuthSignupSchema = Type.Object({
  email: Type.Ref(AuthBaseSchema, 'email'),
  username: Type.Ref(AuthBaseSchema, 'username'),
  password: Type.Ref(AuthBaseSchema, 'password'),
});
export interface ISignupBody extends Static<typeof AuthSignupSchema> {}
