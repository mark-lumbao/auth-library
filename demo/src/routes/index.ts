import { FastifyInstance } from 'fastify';
import authRoutes from '@main/auth';
import rootRoutes from './root';

const setup = async (fastify: FastifyInstance) => {
  await fastify.register(rootRoutes);
  await fastify.register(
    authRoutes,
    {
      prefix: '/auth',
      privateKey: 'PRIVATE_KEY',
      signupBodySchema: {
        lastName: { type: 'string' },
        firstName: { type: 'string' },
      },
      saveUser: (u) => u, // TODO Save user to db then return result
      fetchUser: (u) => u, // TODO fetch user from db then return result
    },
  );
};

export default setup;
