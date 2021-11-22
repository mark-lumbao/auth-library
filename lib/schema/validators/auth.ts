import { FastifySchemaValidationError } from 'fastify/types/schema';

export type schemaFormatterType = (
  errors: FastifySchemaValidationError[],
  dataVar: string
) => Error;

export const authSchemaValidator: schemaFormatterType = (errors, dataVar) => {
  const message = errors.map(({ message: msg, dataPath }) => {
    const dPath = dataPath.replace('.', '');
    if (dPath === 'password' && dataVar === 'body') return `${dPath}: Invalid password format!`;

    return `${dPath}: ${msg}`;
  });
  return new Error(message.join(', '));
};

export default {
  authSchemaValidator,
};
