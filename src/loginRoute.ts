import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import auth from '..';
import {
  AuthLoginResSchema,
  ILoginBody,
  AuthLoginReqSchema,
} from './schema/auth.schema';
import { authSchemaValidator } from './schema/validators/auth';

const useLoginRoute: typeof auth = async (
  fastify,
  { privateKey, fetchUser, tokenLifespan },
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
    handler: async (request, reply) => {
      if (request.validationError) {
        reply.status(400).send(request.validationError);
      } else {
        const user = await fetchUser(request.body);
        if (!user) {
          reply.status(401).send('User not found!');
        } else {
          const passPassed = await compare(
            request.body.password,
            (user as { password: string }).password,
          );
          if (!passPassed) {
            reply.status(401).send('Incorrect password!');
          } else {
            const sessionToken = sign(user, privateKey, {
              expiresIn: tokenLifespan,
            });
            reply.send({ ...user, sessionToken });
          }
        }
      }
    },
  });
};

export default useLoginRoute;
