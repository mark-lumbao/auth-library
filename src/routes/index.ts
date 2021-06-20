import { FastifyInstance } from 'fastify';
import rootRoutes from './route.root';
import authRoutes from './route.auth';

const setup = async (fastify: FastifyInstance) => {
  await fastify.register(rootRoutes);
  await fastify.register(authRoutes, { prefix: '/auth' });
};

export default setup;
