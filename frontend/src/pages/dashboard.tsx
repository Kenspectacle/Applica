import JobTable from '../components/job-table';
import JobApplicationTable from '../components/job-application-table';
import StatsOverview from '../components/stats-overview';
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client';
import type { JobApplication } from '../types/JobApplication';

const GET_JOB_APPLICATIONS = gql`
  query GetAllJobApplications {
    jobApplications {
    id
    jobId
    resumeURL
    firstName
    lastName
    phone
    email
    addressCountry
    addressCity
    addressPostalCode
    addressStreet
    addressStreetNumber
    applicationStatus
    createdAt
    job {
      id
      role
      location
    }
  }
}
`;

function Dashboard() {
  // Sample data for job applications
  const { data } = useQuery(GET_JOB_APPLICATIONS);
  const jobApplications: JobApplication[] = data?.jobApplications || [];
  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <p>Welcome to your job application dashboard!</p>
      <StatsOverview jobApplications={jobApplications}/>
      <JobApplicationTable jobApplications={jobApplications}/>
      <JobTable />
      <button className="link-button">
        <Link to="/new-job">
          Add New Job
        </Link>
      </button>
    </div>
  )
}

export default Dashboard
