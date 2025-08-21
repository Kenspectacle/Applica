import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Job } from '../entities/job.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
  ) {}

  // Get all jobs
  async findAll(): Promise<Job[]> {
    return this.jobsRepository.find();
  }

  // Get only active jobs (not archived)
  async findActive(): Promise<Job[]> {
    return this.jobsRepository.find({
      where: { isArchived: false }
    });
  }

  // Get job by ID
  async findOne(id: string): Promise<Job> {
    const job = await this.jobsRepository.findOneBy({ id });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  // Get jobs by location
  async findByLocation(location: string): Promise<Job[]> {
    return this.jobsRepository.find({
      where: { location, isArchived: false }
    });
  }

  // Search jobs by role (case insensitive)
  async searchByRole(roleKeyword: string): Promise<Job[]> {
    return this.jobsRepository
      .createQueryBuilder('job')
      .where('LOWER(job.role) LIKE LOWER(:role)', { role: `%${roleKeyword}%` })
      .andWhere('job.isArchived = :archived', { archived: false })
      .getMany();
  }

  // Create a new job
  async create(jobData: Partial<Job>): Promise<Job> {
    const job = this.jobsRepository.create(jobData);
    return this.jobsRepository.save(job);
  }

  // Update a job
  async update(id: string, updateData: Partial<Job>): Promise<Job> {
    await this.jobsRepository.update(id, updateData);
    return this.findOne(id);
  }

  // Archive a job (soft delete)
  async archive(id: string): Promise<Job> {
    await this.jobsRepository.update(id, { isArchived: true });
    return this.findOne(id);
  }

  // Delete a job permanently
  async delete(id: string): Promise<boolean> {
    const result = await this.jobsRepository.delete(id);
    return (result.affected ?? 0) > 0; // make sure there it is not null
  }
}