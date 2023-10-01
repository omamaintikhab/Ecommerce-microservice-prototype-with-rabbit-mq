import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';
import {Transport} from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://ehkahnql:JuXj-G_7Q9j6iultT-fPMd-fEJEQHYcX@armadillo.rmq.cloudamqp.com/ehkahnql'],
        queue: 'main_queue',
        queueOptions: {
          durable: false
        },
      },
    });
    app.listen();
  }
bootstrap()