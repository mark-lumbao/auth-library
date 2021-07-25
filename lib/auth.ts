import { FastifyInstance } from 'fastify';
import { hash } from 'bcrypt';
import {
  AuthLoginSchema, AuthSignupSchema, ILoginBody,
  ISignupBody, AuthBaseSchema,
} from '@main/schema/auth.schema';
import { authSchemaValidator } from '@main/schema/validators/auth';

const authRoutes = async (fastify: FastifyInstance) => {
  fastify.addSchema(AuthBaseSchema);

  fastify.route<{ Body: ISignupBody }>({
    method: 'POST',
    url: '/signup',
    schema: { body: AuthSignupSchema },
    schemaErrorFormatter: authSchemaValidator,
    handler: async (request, reply) => {
      if (request.validationError) {
        reply.status(400).send(request.validationError);
      } else {
        /**
         * - Save user data with encrypted password
         * - Generate json web token for the session
         * - Respond with token and created user data without the password
         */
        request.body.password = await hash(request.body.password, 10);
        reply.send(request.body);
      }
    },
  });

  fastify.route<{ Body: ILoginBody }>({
    method: 'POST',
    url: '/login',
    schema: { body: AuthLoginSchema },
    schemaErrorFormatter: authSchemaValidator,
    handler: (request, reply) => {
      if (request.validationError) {
        reply.status(400).send(request.validationError);
      } else reply.send(request.body); // Generate token, fetch user data and send it back to user
    },
  });
};

export default authRoutes;
