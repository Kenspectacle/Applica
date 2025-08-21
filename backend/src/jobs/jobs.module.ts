import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from '../entities/job.entity';
import { JobsService } from './jobs.service';
import { JobsResolver } from './jobs.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  providers: [JobsService, JobsResolver],
  exports: [JobsService],
})
export class JobsModule {}