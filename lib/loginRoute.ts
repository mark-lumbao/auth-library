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
        /* ToDos:
         *
         * - Add verification logic
         * - Verify in demo that logic is working
         */
        fetchUser(request.body);
        const sessionToken = sign(request.body, privateKey);
        reply.send({ ...request.body, sessionToken });
      }
    },
  });
};

export default useLoginRoute;
