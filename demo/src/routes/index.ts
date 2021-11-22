import { FastifyInstance } from 'fastify';
import authRoutes from '@mal-auth';
import { save, get } from '@app/utils/persist';
import rootRoutes from './root';
import protectedRoutes from './protected';

const setup = async (fastify: FastifyInstance) => {
  await fastify.register(rootRoutes);
  await fastify.register(protectedRoutes);
  await fastify.register(authRoutes, {
    prefix: '/auth',
    privateKey: process.env.PRIVATE_KEY || 'PRIVATE_KEY',
    tokenLifespan: process.env.TOKEN_LIFESPAN || '2h',
    signupBodySchema: {
      lastName: { type: 'string' },
      firstName: { type: 'string' },
    },
    saveUser: (u) => save(u),
    fetchUser: (u) => get(u),
  });
};

export default setup;
