import { sign } from 'jsonwebtoken';
import { IAuthRoutes } from '@types';
import {
  AuthLoginResSchema, ILoginBody, AuthLoginReqSchema,
} from '@main/schema/auth.schema';
import { authSchemaValidator } from '@main/schema/validators/auth';

const useLoginRoute: IAuthRoutes = async (
  fastify, { privateKey, fetchUser },
) => {
  fastify.route<{ Body: ILoginBody }>({
    method: 'POST',
    url: '/login',
    schema: {
      body: AuthLoginReqSchema,
      response: {
        200: AuthLoginResSchema,
      },
    },
    schemaErrorFormatter: authSchemaValidator,
    handler: (request, reply) => {
      if (request.validationError) {
        reply.status(400).send(request.validationError);
      } else {
        const user = fetchUser(request.body);
        if (!user) throw new Error('Unknown user');
        const sessionToken = sign(user, privateKey);
        reply.send({ ...user, sessionToken });
      }
    },
  });
};

export default useLoginRoute;
