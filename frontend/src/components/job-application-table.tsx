import { Search, ChevronUp, ChevronDown, Eye, Download } from 'lucide-react';
import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import type { Job } from '../types/Job';

const GET_JOB_APPLICATIONS = gql`
  query GetAllJobApplications {
    jobApplications {
    id
    jobId
    resumeId
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

interface JobApplication {
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

function JobApplicationTable () {
    const { data } = useQuery(GET_JOB_APPLICATIONS);
    const jobApplications: JobApplication[] = data?.jobApplications || [];
    console.log(jobApplications);

    const handleViewResume = (resume: string): void => {
        console.log('Viewing resume:', resume);
        // Add your view logic here
      };
    
      const handleDownloadResume = (resume: string): void => {
        console.log('Downloading resume:', resume);
        // Add your download logic here
      };

    return (<div className="data-table-container">
        <div className="table-header">
          <h2>Job Applications</h2>
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search applications..."
              className="search-input"
            />
          </div>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th 
                  className="sortable-header"
                >
                  <div className="header-content">
                    <span>Status</span>
                  </div>
                </th>
                <th 
                  className="sortable-header"
                >
                  <div className="header-content">
                    <span>First Name</span>
                  </div>
                </th>
                <th 
                  className="sortable-header"
                >
                  <div className="header-content">
                    <span>Last Name</span>
                  </div>
                </th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th 
                  className="sortable-header"
                >
                  <div className="header-content">
                    <span>Job Position</span>
                  </div>
                </th>
                <th>Resume</th>
              </tr>
            </thead>
            <tbody>
              {jobApplications.map((app: JobApplication) => (
                <tr key={app.id}>
                  <td>{app.applicationStatus}</td>
                  <td>{app.firstName}</td>
                  <td>{app.lastName}</td>
                  <td>
                    <a href={`mailto:${app.email}`} className="email-link">
                      {app.email}
                    </a>
                  </td>
                  <td className="address-cell">{app.addressCity}, {app.addressCountry} </td>
                  <td>
                    <a href={`tel:${app.phone}`} className="phone-link">
                      {app.phone}
                    </a>
                  </td>
                  <td>
                    <span className="job-position-badge">
                      {app.job.role} | {app.job.location}
                    </span>
                  </td>
                  <td>
                    <div className="resume-actions">
                      <button 
                        className="action-button view-button"
                        onClick={() => handleViewResume(app.resume)}
                        type="button"
                      >
                        <Eye className="action-icon" />
                        View
                      </button>
                      <button 
                        className="action-button download-button"
                        onClick={() => handleDownloadResume(app.resume)}
                        type="button"
                      >
                        <Download className="action-icon" />
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
)};

export default JobApplicationTable