import { Search, ChevronUp, ChevronDown, Eye, Download } from 'lucide-react';
import { useState, useMemo } from 'react';
import type { JobApplication } from '../types/JobApplication';

interface JobApplicationTableProps {
  jobApplications: JobApplication[];
}

function JobApplicationTable ( {jobApplications}: JobApplicationTableProps) {
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Filter applications based on search term
    const filteredApplications = useMemo(() => {
      if (!searchTerm.trim()) {
        return jobApplications;
      }

      const lowercaseSearchTerm = searchTerm.toLowerCase().trim();
      
      return jobApplications.filter((app) => {
        const fullName = `${app.firstName} ${app.lastName}`.toLowerCase();
        const email = app.email.toLowerCase();
        
        return fullName.includes(lowercaseSearchTerm) || 
               email.includes(lowercaseSearchTerm);
      });
    }, [jobApplications, searchTerm]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    };


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
              placeholder="Search by name or email..."  // CHANGED: More descriptive placeholder
              className="search-input"
              value={searchTerm}                        // ADDED: Controlled input value
              onChange={handleSearchChange}            // ADDED: Change handler
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
              {filteredApplications.map((app: JobApplication) => (
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
              {filteredApplications.length === 0 && searchTerm && (
                <tr>
                  <td colSpan={8} className="no-results">
                    No applications found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
)};

export default JobApplicationTable