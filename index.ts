import { FastifyPluginCallback } from 'fastify';
import {
  ILoginBody,
  ISignupBody,
  AuthBaseSchema,
} from './src/schema/auth.schema';
import signupRoute from './src/signupRoute';
import loginRoute from './src/loginRoute';
import verifyRequest from './src/utils/verifyRequest';

export interface IAuthRoutesOptions {
  saveUser: <T extends ISignupBody>(opt: T) => Promise<object | undefined>;
  fetchUser: <T extends ILoginBody>(opt: T) => Promise<object | undefined>;
  privateKey: string;
  tokenLifespan: number | string;
  signupBodySchema?: object;
}

const authRoutes: FastifyPluginCallback<IAuthRoutesOptions> = async (
  fastify,
  { signupBodySchema = {}, ...rest },
  done,
) => {
  fastify.addSchema(AuthBaseSchema);
  signupRoute(fastify, { ...rest, signupBodySchema }, done);
  loginRoute(fastify, { ...rest, signupBodySchema }, done);
  done();
};

export const verify = verifyRequest;

export default authRoutes;
