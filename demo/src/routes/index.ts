import { FastifyInstance } from 'fastify';
import authRoutes from '@main/auth';
import rootRoutes from './root';

const setup = async (fastify: FastifyInstance) => {
  await fastify.register(rootRoutes);
  await fastify.register(authRoutes, { prefix: '/auth' });
};

export default setup;
