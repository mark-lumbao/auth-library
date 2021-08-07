import { FastifyPluginAsync } from 'fastify';
import { FastifySchemaValidationError } from 'fastify/types/schema';

declare module '@types' {
  export type schemaFormatterType = (
    errors: FastifySchemaValidationError[],
    dataVar: string,
  ) => Error;

  export interface IAuthRoutesOptions {
    privateKey: string;
    saveUser: <T extends object>(opt: T) => void;
    fetchUser: <T extends object>(opt: T) => void;
    signupBodySchema?: object;
  }

  export interface IAuthRoutes extends FastifyPluginAsync<IAuthRoutesOptions> {}
}
