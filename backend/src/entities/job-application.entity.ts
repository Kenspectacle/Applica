import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Job } from './job.entity';

export enum ApplicationStatus {
  RECEIVED = 'received',
  REVIEWING = 'reviewing',
  INTERVIEW = 'interview',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted'
}

registerEnumType(ApplicationStatus, {
  name: 'ApplicationStatus',
});

@Entity('job_application')
@ObjectType()
export class JobApplication {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ name: 'job_id', type: 'uuid' })
  @Field(() => ID)
  jobId: string;

  @Column({ name: 'resume_URL', type: 'text' })
  @Field()
  resumeURL: string;

  @Column({ name: 'first_name', type: 'text' })
  @Field()
  firstName: string;

  @Column({ name: 'last_name', type: 'text' })
  @Field()
  lastName: string;

  @Column({ type: 'text' })
  @Field()
  phone: string;

  @Column({ type: 'text' })
  @Field()
  email: string;

  @Column({ name: 'address_country', type: 'text' })
  @Field()
  addressCountry: string;

  @Column({ name: 'address_city', type: 'text' })
  @Field()
  addressCity: string;

  @Column({ name: 'address_postalcode', type: 'text' })
  @Field()
  addressPostalCode: string;

  @Column({ name: 'address_street', type: 'text' })
  @Field()
  addressStreet: string;

  @Column({ name: 'address_street_number', type: 'text', nullable: true })
  @Field({ nullable: true })
  addressStreetNumber?: string;
  
  @Column({ 
    name: 'application_status',
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.RECEIVED
  })
  @Field(() => ApplicationStatus)
  applicationStatus: ApplicationStatus;

  @Column({ 
    name: 'created_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP'
  })
  @Field(() => String)
  createdAt: Date;

  // Relation to Job entity
  @ManyToOne(() => Job, { eager: false })
  @JoinColumn({ name: 'job_id' })
  @Field(() => Job, { nullable: true })
  job?: Job;
}