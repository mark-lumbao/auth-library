import { FastifyInstance } from 'fastify';
import { loginPayloadScheme, signUpPayloadScheme } from '@app/schema/auth';
import { passwordValidationError } from '@app/utils/route/auth';
/**
 * **attachValidation** property enables custom validationError handling
 * Reference: https://www.fastify.io/docs/latest/Validation-and-Serialization/#error-handling
 */
const authRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'POST',
    url: '/signup',
    attachValidation: true,
    schema: signUpPayloadScheme,
    handler: (request, reply) => {
      if (request.validationError) {
        reply.status(400).send(passwordValidationError(request.validationError));
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
    attachValidation: true,
    schema: loginPayloadScheme,
    handler: (request, reply) => {
      if (request.validationError) {
        reply.status(400).send(passwordValidationError(request.validationError));
      } else reply.send(request.body);
    },
  });
};

export default authRoutes;
