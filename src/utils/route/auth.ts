import { IValidationError } from '@types';

export const passwordValidationError = (error: IValidationError) => (error.validation
  .find(({ dataPath, keyword }) => dataPath === '.password' && keyword === 'pattern')
  ? new Error('Password pattern error!') : error);

export default {
  passwordValidationError,
};
