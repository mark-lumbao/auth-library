import { FastifyInstance } from 'fastify';
import { verify } from '@main/auth';

const protectedRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/protected',
    preHandler: (request, _, done) => {
      verify(request, process.env.PRIVATE_KEY || '');
      done();
    },
    handler: (_, reply) => {
      reply.send('Your Token is valid and verified!');
    },
  });
};

export default protectedRoutes;
