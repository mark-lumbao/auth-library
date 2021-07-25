import { schemaFormatterType } from '@types';

export const authSchemaValidator: schemaFormatterType = (errors, dataVar) => {
  const message = errors.map(({ message: msg, dataPath }) => {
    const dPath = dataPath.replace('.', '');
    if (dPath === 'password' && dataVar === 'body')
      return `${dPath}: Invalid password format!`;

    return `${dPath}: ${msg}`;
  });
  return new Error(message.join(', '));
};

export default {
  authSchemaValidator,
};
