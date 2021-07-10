export const authSchema = ({
  $id: 'auth-schema',
  type: 'object',
  definitions: {
    username: {
      title: 'Username',
      type: 'string',
    },
    email: {
      title: 'Email Address',
      type: 'string',
      pattern: '.+@.+\\..+',
    },
    password: {
      title: 'Password',
      type: 'string',
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#?!@$%^&*-])[a-zA-Z\\d#?!@$%^&*-]{8,}$',
    },
  },
  properties: {
    username: { $ref: 'auth-schema#/definitions/username' },
    email: { $ref: 'auth-schema#/definitions/email' },
    password: { $ref: 'auth-schema#/definitions/password' },
  },
  required: ['username', 'email', 'password'],
});

export const loginPayloadScheme = ({
  body: {
    type: 'object',
    properties: {
      username: { $ref: 'auth-schema#/definitions/username' },
      email: { $ref: 'auth-schema#/definitions/email' },
      password: { $ref: 'auth-schema#/definitions/password' },
    },
    required: [
      ...Object.keys(authSchema.definitions).filter((v) => v !== 'email'),
    ],
  },
});

export const signUpPayloadScheme = ({
  body: {
    $ref: 'auth-schema#',
  },
});
