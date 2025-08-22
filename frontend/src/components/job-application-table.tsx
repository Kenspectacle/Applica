import { Search, ChevronUp, ChevronDown, Eye, Download } from 'lucide-react';
import { useState } from 'react';

interface JobApplication {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
    jobPosition: string;
    resume: string;
  }

function JobApplicationTable () {
    const handleViewResume = (resume: string): void => {
        console.log('Viewing resume:', resume);
        // Add your view logic here
      };
    
      const handleDownloadResume = (resume: string): void => {
        console.log('Downloading resume:', resume);
        // Add your download logic here
      };

    const [jobApplications] = useState([
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@email.com',
          address: '123 Main St, New York, NY',
          phone: '+1 (555) 123-4567',
          jobPosition: 'Software Engineer',
          resume: 'john_doe_resume.pdf'
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@email.com',
          address: '456 Oak Ave, Los Angeles, CA',
          phone: '+1 (555) 987-6543',
          jobPosition: 'Frontend Developer',
          resume: 'jane_smith_resume.pdf'
        },
        {
          id: 3,
          firstName: 'Mike',
          lastName: 'Johnson',
          email: 'mike.j@email.com',
          address: '789 Pine St, Chicago, IL',
          phone: '+1 (555) 246-8135',
          jobPosition: 'Full Stack Developer',
          resume: 'mike_johnson_resume.pdf'
        }
      ]);

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
                    <span>ID</span>
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
                  <td>{app.id}</td>
                  <td>{app.firstName}</td>
                  <td>{app.lastName}</td>
                  <td>
                    <a href={`mailto:${app.email}`} className="email-link">
                      {app.email}
                    </a>
                  </td>
                  <td className="address-cell">{app.address}</td>
                  <td>
                    <a href={`tel:${app.phone}`} className="phone-link">
                      {app.phone}
                    </a>
                  </td>
                  <td>
                    <span className="job-position-badge">
                      {app.jobPosition}
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