import { FastifyInstance } from 'fastify';
import { hash } from 'bcrypt';
import { loginPayloadScheme, signUpPayloadScheme, authSchema } from '@main/schema/auth';
import { authSchemaValidator } from '@main/schema/validators/auth';

const authRoutes = async (fastify: FastifyInstance) => {
  fastify.addSchema(authSchema);

  fastify.route({
    method: 'POST',
    url: '/signup',
    schema: signUpPayloadScheme,
    schemaErrorFormatter: authSchemaValidator,
    handler: async (request, reply) => {
      if (request.validationError) {
        reply.status(400).send(request.validationError);
      } else {
        /**
         * **ToDos**:
         * - Add type support for request body
         *
         * **Flow**:
         * - Encrypt password from payload
         * - Save user data with encrypted password
         * - Generate json web token for the session
         * - Respond with token and created user data without the password
         */
        const body = request.body as { password: string }; // temporary type fix
        const encryptedPassword = await hash(body.password, 10);
        reply.send({ ...body, password: encryptedPassword });
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
      } else reply.send(request.body); // Generate token, fetch user data and send it back to user
    },
  });
};

export default authRoutes;
