import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Job } from '../entities/job.entity';
import { JobsService } from './jobs.service';
import { CreateJobInput, UpdateJobInput } from './dto/create-job.input';

@Resolver(() => Job)
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Query(() => [Job], { name: 'jobs' })
  async findAll(): Promise<Job[]> {
    return this.jobsService.findAll();
  }

  @Query(() => [Job], { name: 'activeJobs' })
  async findActive(): Promise<Job[]> {
    return this.jobsService.findActive();
  }

  @Query(() => Job, { name: 'job' })
  async findOne(@Args('id') id: string): Promise<Job> {
    return this.jobsService.findOne(id);
  }

  @Query(() => [Job], { name: 'jobsByLocation' })
  async findByLocation(@Args('location') location: string): Promise<Job[]> {
    return this.jobsService.findByLocation(location);
  }

  @Query(() => [Job], { name: 'searchJobs' })
  async searchByRole(@Args('roleKeyword') roleKeyword: string): Promise<Job[]> {
    return this.jobsService.searchByRole(roleKeyword);
  }

  @Mutation(() => Job)
  async createJob(@Args('createJobInput') createJobInput: CreateJobInput): Promise<Job> {
    return this.jobsService.create(createJobInput);
  }

  @Mutation(() => Job)
  async updateJob(
    @Args('id') id: string,
    @Args('updateJobInput') updateJobInput: UpdateJobInput,
  ): Promise<Job> {
    return this.jobsService.update(id, updateJobInput);
  }

  @Mutation(() => Job)
  async archiveJob(@Args('id') id: string): Promise<Job> {
    return this.jobsService.archive(id);
  }

  @Mutation(() => Boolean)
  async deleteJob(@Args('id') id: string): Promise<boolean> {
    return this.jobsService.delete(id);
  }
}