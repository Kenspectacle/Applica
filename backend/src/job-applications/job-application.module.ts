import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplication } from '../entities/job-application.entity';
import { JobApplicationService } from './job-application.service';
import { JobApplicationResolver } from './job-application.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([JobApplication])],
  providers: [JobApplicationService, JobApplicationResolver],
  exports: [JobApplicationService],
})
export class JobApplicationModule {}