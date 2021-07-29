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

export const AuthLoginReqSchema = Type.Object({
  email: Type.Optional(Type.Ref(AuthBaseSchema, 'email')),
  username: Type.Ref(AuthBaseSchema, 'username'),
  password: Type.Ref(AuthBaseSchema, 'password'),
}, { additionalProperties: false });

export const AuthLoginResSchema = Type.Object({
  email: Type.Optional(Type.Ref(AuthBaseSchema, 'email')),
  username: Type.Ref(AuthBaseSchema, 'username'),
  sessionToken: Type.String(),
});

export interface ILoginBody extends Static<typeof AuthLoginReqSchema> {}

export const AuthSignupReqSchema = Type.Object({
  email: Type.Ref(AuthBaseSchema, 'email'),
  username: Type.Ref(AuthBaseSchema, 'username'),
  password: Type.Ref(AuthBaseSchema, 'password'),
});

export const AuthSignupResSchema = Type.Object({
  email: Type.Ref(AuthBaseSchema, 'email'),
  username: Type.Ref(AuthBaseSchema, 'username'),
  sessionToken: Type.String(),
});

export interface ISignupBody extends Static<typeof AuthSignupReqSchema> {}
