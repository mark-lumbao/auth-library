import { FastifyInstance } from 'fastify';
import authRoutes from '@main/auth';
import { save, get } from '@app/utils/persist';
import rootRoutes from './root';

const setup = async (fastify: FastifyInstance) => {
  await fastify.register(rootRoutes);
  await fastify.register(authRoutes, {
    prefix: '/auth',
    privateKey: 'PRIVATE_KEY',
    signupBodySchema: {
      lastName: { type: 'string' },
      firstName: { type: 'string' },
    },
    saveUser: (u) => save(u),
    fetchUser: (u) => get(u),
  });
};

export default setup;
