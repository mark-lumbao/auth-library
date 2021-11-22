import { FastifyPluginAsync } from 'fastify';
import {
  ILoginBody,
  ISignupBody,
  AuthBaseSchema,
} from '@mal-auth/schema/auth.schema';
import signupRoute from './signupRoute';
import loginRoute from './loginRoute';
import verifyRequest from './utils/verifyRequest';

export interface IAuthRoutesOptions {
  saveUser: <T extends ISignupBody>(opt: T) => Promise<object | undefined>;
  fetchUser: <T extends ILoginBody>(opt: T) => Promise<object | undefined>;
  privateKey: string;
  tokenLifespan: number | string;
  signupBodySchema?: object;
}

export interface IAuthRoutes extends FastifyPluginAsync<IAuthRoutesOptions> {}

const authRoutes: IAuthRoutes = async (
  fastify,
  { signupBodySchema = {}, ...rest },
) => {
  fastify.addSchema(AuthBaseSchema);
  signupRoute(fastify, { ...rest, signupBodySchema });
  loginRoute(fastify, { ...rest, signupBodySchema });
};

export const verify = verifyRequest;

export default authRoutes;
