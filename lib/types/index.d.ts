import { FastifyPluginAsync } from 'fastify';
import { FastifySchemaValidationError } from 'fastify/types/schema';
import { ILoginBody, ISignupBody } from 'lib/schema/auth.schema';

declare module '@types' {
  export type schemaFormatterType = (
    errors: FastifySchemaValidationError[],
    dataVar: string,
  ) => Error;

  export interface IAuthRoutesOptions {
    privateKey: string;
    saveUser: <T extends ISignupBody>(opt: T) => object | undefined;
    fetchUser: <T extends ILoginBody>(opt: T) => object | undefined;
    signupBodySchema?: object;
  }

  export interface IAuthRoutes extends FastifyPluginAsync<IAuthRoutesOptions> {}
}
