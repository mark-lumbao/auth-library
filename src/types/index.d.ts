import { FastifySchemaValidationError } from 'fastify/types/schema';

declare module '@types' {
  export type schemaFormatterType = (
    errors: FastifySchemaValidationError[],
    dataVar: string,
  ) => Error;
}
