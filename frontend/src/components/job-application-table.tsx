import { Search, ChevronUp, ChevronDown, Eye, Download, Filter } from 'lucide-react';

import { useState, useMemo } from 'react';
import type { JobApplication } from '../types/JobApplication';

interface JobApplicationTableProps {
  jobApplications: JobApplication[];
}

function JobApplicationTable({ jobApplications }: JobApplicationTableProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'job' | 'status'>('all');
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState<boolean>(false);
  const [isJobDropdownOpen, setIsJobDropdownOpen] = useState<boolean>(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState<boolean>(false);

  console.log(jobApplications);

  // Get unique jobs and statuses for filter options
  const uniqueJobs = useMemo(() => {
    const jobs = jobApplications.map(app => `${app.job.role} | ${app.job.location}`);
    return [...new Set(jobs)];
  }, [jobApplications]);

  const uniqueStatuses = useMemo(() => {
    const statuses = jobApplications.map(app => app.applicationStatus);
    return [...new Set(statuses)];
  }, [jobApplications]);

  // Filter applications based on search term and filters
  const filteredApplications = useMemo(() => {
    let filtered = jobApplications;

    // Apply search filter
    if (searchTerm.trim()) {
      const lowercaseSearchTerm = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((app) => {
        const fullName = `${app.firstName} ${app.lastName}`.toLowerCase();
        const email = app.email.toLowerCase();

        return fullName.includes(lowercaseSearchTerm) ||
          email.includes(lowercaseSearchTerm);
      });
    }

    // Apply job filter
    if (filterType === 'job' && selectedJob) {
      filtered = filtered.filter(app =>
        `${app.job.role} | ${app.job.location}` === selectedJob
      );
    }

    // Apply status filter
    if (filterType === 'status' && selectedStatus) {
      filtered = filtered.filter(app => app.applicationStatus === selectedStatus);
    }

    return filtered;
  }, [jobApplications, searchTerm, filterType, selectedJob, selectedStatus]);

  const handleViewResume = (resume: string): void => {
    console.log('Viewing resume:', resume);
    // Add your view logic here
  };

  const handleDownloadResume = async (url: string) => {
  try {
    const response = await fetch(url, { mode: 'cors' }); // fetch the PDF
    if (!response.ok) throw new Error('Network response was not ok');

    const blob = await response.blob();                 // convert to blob
    const blobUrl = window.URL.createObjectURL(blob);   // create temporary URL

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = url.split('/').pop() || 'resume.pdf'; // suggested filename
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(blobUrl); // clean up
  } catch (error) {
    console.error('Failed to download file:', error);
  }
};

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleFilterTypeChange = (type: 'all' | 'job' | 'status'): void => {
    setFilterType(type);
    setIsFilterDropdownOpen(false);

    // Reset selections when changing filter type
    if (type === 'all') {
      setSelectedJob('');
      setSelectedStatus('');
    } else if (type === 'job') {
      setSelectedStatus('');
      setIsJobDropdownOpen(true);
    } else if (type === 'status') {
      setSelectedJob('');
      setIsStatusDropdownOpen(true);
    }
  };

  const handleJobSelect = (job: string): void => {
    setSelectedJob(job);
    setIsJobDropdownOpen(false);
  };

  const handleStatusSelect = (status: string): void => {
    setSelectedStatus(status);
    setIsStatusDropdownOpen(false);
  };

  const getFilterButtonText = (): string => {
    if (filterType === 'job' && selectedJob) {
      return `Filter: ${selectedJob}`;
    }
    if (filterType === 'status' && selectedStatus) {
      return `Filter: ${selectedStatus}`;
    }
    return 'Filter: Show All';
  };

  return (<>
    <div className="filter-container">
      <button
        className="filter-button"
        onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
        type="button"
      >
        <Filter className="filter-icon" />
        {getFilterButtonText()}
        <ChevronDown className={`chevron ${isFilterDropdownOpen ? 'rotated' : ''}`} />
      </button>

      {/* Level 1 filter */}
      {isFilterDropdownOpen && (
        <div className="filter-dropdown">
          <button
            className={`filter-option ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterTypeChange('all')}
            type="button"
          >
            Show All
          </button>
          <button
            className={`filter-option ${filterType === 'job' ? 'active' : ''}`}
            onClick={() => handleFilterTypeChange('job')}
            type="button"
          >
            Job
          </button>
          <button
            className={`filter-option ${filterType === 'status' ? 'active' : ''}`}
            onClick={() => handleFilterTypeChange('status')}
            type="button"
          >
            Status
          </button>
        </div>
      )}

      {/* Level 2 filter */}
      {filterType === 'job' && (
        <div className="sub-filter-container">
          <button
            className="sub-filter-button"
            onClick={() => setIsJobDropdownOpen(!isJobDropdownOpen)}
            type="button"
          >
            {'Select Job'}
            <ChevronDown className={`chevron ${isJobDropdownOpen ? 'rotated' : ''}`} />
          </button>

          {isJobDropdownOpen && (
            <div className="sub-filter-dropdown">
              {uniqueJobs.map((job) => (
                <button
                  key={job}
                  className={`sub-filter-option ${selectedJob === job ? 'active' : ''}`}
                  onClick={() => handleJobSelect(job)}
                  type="button"
                >
                  {job}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {filterType === 'status' && (
        <div className="sub-filter-container">
          <button
            className="sub-filter-button"
            onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
            type="button"
          >
            {'Select Status'}
            <ChevronDown className={`chevron ${isStatusDropdownOpen ? 'rotated' : ''}`} />
          </button>

          {isStatusDropdownOpen && (
            <div className="sub-filter-dropdown">
              {uniqueStatuses.map((status) => (
                <button
                  key={status}
                  className={`sub-filter-option ${selectedStatus === status ? 'active' : ''}`}
                  onClick={() => handleStatusSelect(status)}
                  type="button"
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
    <div className="data-table-container">
      <div className="table-header">
        <h2>Job Applications</h2>
        <div className="table-controls">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>


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
                      onClick={() => handleViewResume(app.resumeURL)}
                      type="button"
                    >
                      <Eye className="action-icon" />
                      View
                    </button>
                    <button
                      className="action-button download-button"
                      onClick={() => handleDownloadResume(app.resumeURL)}
                      type="button"
                    >
                      <Download className="action-icon" />
                      Download
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredApplications.length === 0 && (searchTerm || filterType !== 'all') && (
              <tr>
                <td colSpan={8} className="no-results">
                  {searchTerm ? `No applications found matching "${searchTerm}"` : 'No applications found with selected filters'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </>
  )
};

export default JobApplicationTable