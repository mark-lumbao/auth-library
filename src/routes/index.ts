import { FastifyInstance } from 'fastify';
import rootRoutes from './root';
import authRoutes from './auth';

const setup = async (fastify: FastifyInstance) => {
  await fastify.register(rootRoutes);
  await fastify.register(authRoutes, { prefix: '/auth' });
};

export default setup;
