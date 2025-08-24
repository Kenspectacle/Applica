// job-application.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobApplication } from '../entities/job-application.entity';
import { CreateJobApplicationInput } from 'src/jobs/dto/job-application.input';

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

  async create(input: CreateJobApplicationInput): Promise<JobApplication> {
    // Save to database
    const jobApplication = this.jobApplicationRepository.create({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      jobId: input.jobId,
      resumeURL: input.resumeURL,
      addressCountry: input.addressCountry,
      addressCity: input.addressCity,
      addressPostalCode: input.addressPostalCode,
      addressStreet: input.addressStreet,
      addressStreetNumber: input.addressStreetNumber,
    });

    return this.jobApplicationRepository.save(jobApplication);
  }
}