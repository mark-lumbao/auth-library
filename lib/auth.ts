import { AuthBaseSchema } from '@main/schema/auth.schema';
import { IAuthRoutes } from '@types';
import signupRoute from './signupRoute';
import loginRoute from './loginRoute';

const authRoutes: IAuthRoutes = async (
  fastify, { signupBodySchema = {}, ...rest },
) => {
  fastify.addSchema(AuthBaseSchema);
  signupRoute(fastify, { ...rest, signupBodySchema });
  loginRoute(fastify, { ...rest, signupBodySchema });
};

export default authRoutes;
