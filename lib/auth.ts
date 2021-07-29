import { FastifyInstance } from 'fastify';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import {
  AuthLoginReqSchema, AuthSignupReqSchema, ILoginBody,
  AuthLoginResSchema, ISignupBody, AuthBaseSchema,
} from '@main/schema/auth.schema';
import { authSchemaValidator } from '@main/schema/validators/auth';

const authRoutes = async (fastify: FastifyInstance) => {
  fastify.addSchema(AuthBaseSchema);

  const PRIVATE_KEY = 'PRIVATE_KEY'; // this is a temporary value

  fastify.route<{ Body: ISignupBody }>({
    method: 'POST',
    url: '/signup',
    schema: {
      body: AuthSignupReqSchema,
      response: {
        200: AuthLoginResSchema,
      },
    },
    schemaErrorFormatter: authSchemaValidator,
    handler: async (request, reply) => {
      if (request.validationError) {
        reply.status(400).send(request.validationError);
      } else {
        request.body.password = await hash(request.body.password, 10);
        const sessionToken = sign(request.body, PRIVATE_KEY);
        reply.send({ ...request.body, sessionToken });
      }
    },
  });

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
        const sessionToken = sign(request.body, PRIVATE_KEY);
        reply.send({ ...request.body, sessionToken });
      }
    },
  });
};

export default authRoutes;
