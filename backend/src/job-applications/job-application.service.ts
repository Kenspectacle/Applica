// job-application.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobApplication } from '../entities/job-application.entity';

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectRepository(JobApplication)
    private readonly jobApplicationRepository: Repository<JobApplication>,
  ) {}

  async findAll(): Promise<JobApplication[]> {
    return this.jobApplicationRepository.find({
      relations: ['job'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findById(id: string): Promise<JobApplication | null> {
    return this.jobApplicationRepository.findOne({
      where: { id },
      relations: ['job'],
    });
  }

  async findByJobId(jobId: string): Promise<JobApplication[]> {
    return this.jobApplicationRepository.find({
      where: { jobId },
      relations: ['job'],
      order: {
        createdAt: 'DESC',
      },
    });
  }
}