import { AuthBaseSchema } from '@main/schema/auth.schema';
import { AuthRoutesType } from '@types';
import signupRoute from './signupRoute';
import loginRoute from './loginRoute';

const authRoutes: AuthRoutesType = async (
  fastify, { privateKey, signupBodySchema = {} },
) => {
  fastify.addSchema(AuthBaseSchema);
  signupRoute(fastify, { privateKey, signupBodySchema });
  loginRoute(fastify, { privateKey, signupBodySchema });
};

export default authRoutes;
