import { FastifyInstance } from 'fastify';
import { loginPayloadScheme, signUpPayloadScheme, authSchema } from '@main/schema/auth';
import { authSchemaValidator } from '@main/schema/validators/auth';

const authRoutes = async (fastify: FastifyInstance) => {
  fastify.addSchema(authSchema);

  fastify.route({
    method: 'POST',
    url: '/signup',
    schema: signUpPayloadScheme,
    schemaErrorFormatter: authSchemaValidator,
    handler: (request, reply) => {
      if (request.validationError) {
        reply.status(400).send(request.validationError);
      } else {
        /**
         * Save user data and reply with newly created user profile.
         * Also, generate session token via JWT and attach it to the message.
         */
        reply.send(request.body);
      }
    },
  });

  fastify.route({
    method: 'POST',
    url: '/login',
    schema: loginPayloadScheme,
    schemaErrorFormatter: authSchemaValidator,
    handler: (request, reply) => {
      if (request.validationError) {
        reply.status(400).send(request.validationError);
      } else reply.send(request.body);
    },
  });
};

export default authRoutes;
