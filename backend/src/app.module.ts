import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { JobsModule } from './jobs/jobs.module';
import { Job } from './entities/job.entity';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Job],
      synchronize: false, // Set to false since your table already exists
      ssl: {
        rejectUnauthorized: false, // Neon requires this
      },
    }),
    JobsModule,
  ],
  controllers: [AppController, DatabaseController],
  providers: [AppService, DatabaseService, AppResolver],
})
export class AppModule {}