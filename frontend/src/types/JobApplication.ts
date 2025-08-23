import type { Job } from './Job';

export interface JobApplication {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    addressCountry: string;
    addressCity: string;
    addressStreet: string;
    addressStreetNumber: string;
    phone: string;
    jobId: string;
    resume: string;
    job: Job;
    applicationStatus: string;
}