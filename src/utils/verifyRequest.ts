import { FastifyRequest } from 'fastify';
import { verify } from 'jsonwebtoken';

export type AuthorizationType = (
  request: FastifyRequest,
  privateKey: string
) => void;
const verifyRequest: AuthorizationType = (
  { headers: { authorization } },
  privateKey,
) => verify((authorization as string).replace('Bearer ', ''), privateKey);

export default verifyRequest;
