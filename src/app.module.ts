import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import config from './config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => ({
        playground: Boolean(configService.get('GRAPHQL_PLAYGROUND')),
        autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
        context: ({ req }) => ({ req }),
        cors: { origin: true, credentials: true }
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        GRAPHQL_PLAYGROUND: Joi.number(),
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
        TOKEN_SECRET_EMAIL: Joi.string().required(),
        TOKEN_EXPIRATION_EMAIL: Joi.string().required(),
        FRONTEND_URL: Joi.string().required(),
        FACEBOOK_CLIENT_ID: Joi.string().required(),
        FACEBOOK_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
      }),
    }),
    DatabaseModule,
  ],
  providers: [AppController],
})
export class AppModule {}
