import Fastify from 'fastify';
import cors from '@fastify/cors';
import { config } from "dotenv";
import userRoutes from './routes/user'; // Substitua pelo caminho correto do seu arquivo de rotas
import postRoutes from './routes/post'; // Substitua pelo caminho correto do seu arquivo de rotas
import likeRoutes from './routes/like';

config();

const port = parseInt(process.env.PORT, 10);

const fastify = Fastify({
  logger: true
});

fastify.register(cors, {
  origin: true, 
  methods: ['GET', 'PUT', 'POST', 'DELETE'] 
});

fastify.register(userRoutes);
fastify.register(postRoutes);
fastify.register(likeRoutes);

fastify.listen({ port: port }, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });