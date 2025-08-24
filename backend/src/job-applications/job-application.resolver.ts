// job-application.resolver.ts
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { JobApplication } from '../entities/job-application.entity';
import { JobApplicationService } from './job-application.service';
import { CreateJobApplicationInput } from 'src/jobs/dto/job-application.input';

@Resolver(() => JobApplication)
export class JobApplicationResolver {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @Query(() => [JobApplication])
  async jobApplications(): Promise<JobApplication[]> {
    return this.jobApplicationService.findAll();
  }

  @Query(() => JobApplication, { nullable: true })
  async jobApplication(@Args('id') id: string): Promise<JobApplication | null> {
    return this.jobApplicationService.findById(id);
  }

  @Query(() => [JobApplication])
  async jobApplicationsByJobId(@Args('jobId') jobId: string): Promise<JobApplication[]> {
    return this.jobApplicationService.findByJobId(jobId);
  }

  @Mutation(() => JobApplication)
  async createJobApplication(
    @Args('input') input: CreateJobApplicationInput,
  ): Promise<JobApplication> {
    return this.jobApplicationService.create(input);
  }
}