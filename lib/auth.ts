import { AuthBaseSchema } from '@main/schema/auth.schema';
import { AuthRoutesType } from '@types';
import signupRoute from './signupRoute';
import loginRoute from './loginRoute';

const authRoutes: AuthRoutesType = async (
  fastify, { signupBodySchema = {}, ...rest },
) => {
  fastify.addSchema(AuthBaseSchema);
  signupRoute(fastify, { ...rest, signupBodySchema });
  loginRoute(fastify, { ...rest, signupBodySchema });
};

export default authRoutes;
