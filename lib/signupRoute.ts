import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { IAuthRoutes } from '@types';
import {
  AuthSignupReqSchema, AuthSignupResSchema,
  AuthLoginResSchema, ISignupBody,
} from '@main/schema/auth.schema';
import { authSchemaValidator } from '@main/schema/validators/auth';

const useSignupRoute: IAuthRoutes = async (
  fastify, { privateKey, saveUser, signupBodySchema = {} },
) => {
  fastify.route<{ Body: ISignupBody }>({
    method: 'POST',
    url: '/signup',
    schema: {
      body: {
        ...AuthSignupReqSchema,
        properties: {
          ...AuthSignupReqSchema.properties,
          ...signupBodySchema,
        },
      },
      response: {
        200: {
          ...AuthLoginResSchema,
          properties: {
            ...AuthSignupResSchema.properties,
            ...signupBodySchema,
          },
        },
      },
    },
    schemaErrorFormatter: authSchemaValidator,
    handler: async (request, reply) => {
      if (request.validationError) {
        reply.status(400).send(request.validationError);
      } else {
        request.body.password = await hash(request.body.password, 10);
        const user = await saveUser(request.body);
        if (!user) throw new Error('Failed to save new user');
        const sessionToken = sign(user, privateKey);
        reply.send({ ...user, sessionToken });
      }
    },
  });
};

export default useSignupRoute;
