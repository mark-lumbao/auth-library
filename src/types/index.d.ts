declare module '@types' {
  export interface IValidation {
    dataPath: string;
    keyword: string;
  }

  export interface IValidationError extends Error {
    validation: IValidation[];
  }
}
