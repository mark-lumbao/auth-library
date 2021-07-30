import { FastifyPluginAsync } from 'fastify';
import { FastifySchemaValidationError } from 'fastify/types/schema';

declare module '@types' {
  export type schemaFormatterType = (
    errors: FastifySchemaValidationError[],
    dataVar: string,
  ) => Error;

  export interface IAuthRoutesOptions {
    privateKey: string;
    signupBodySchema?: object;
  }

  export type AuthRoutesType = FastifyPluginAsync<IAuthRoutesOptions>;
}
