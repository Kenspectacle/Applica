import { Search, ChevronUp, ChevronDown, Eye, Download } from 'lucide-react';
import { useState, useMemo } from 'react';

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

interface JobListing {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  status: string;
}

interface SortConfig {
  field: string;
  direction: 'asc' | 'desc' | '';
}

interface SortIconProps {
  field: string;
  currentSort: SortConfig;
}

function Dashboard() {

  // Sample data for job applications
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
    },
    {
      id: 4,
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah.wilson@email.com',
      address: '321 Elm St, Austin, TX',
      phone: '+1 (555) 369-2580',
      jobPosition: 'UI/UX Designer',
      resume: 'sarah_wilson_resume.pdf'
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Brown',
      email: 'david.brown@email.com',
      address: '654 Maple Dr, Seattle, WA',
      phone: '+1 (555) 147-8520',
      jobPosition: 'Software Engineer',
      resume: 'david_brown_resume.pdf'
    }
  ]);

  // Sample data for job listings
  const [jobListings] = useState([
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      posted: '2024-01-15',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Web Solutions',
      location: 'Remote',
      type: 'Full-time',
      salary: '$90,000 - $110,000',
      posted: '2024-01-12',
      status: 'Active'
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'Startup Inc',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$100,000 - $130,000',
      posted: '2024-01-10',
      status: 'Active'
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      company: 'Design Studio',
      location: 'Los Angeles, CA',
      type: 'Contract',
      salary: '$80,000 - $95,000',
      posted: '2024-01-08',
      status: 'Closed'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'Cloud Systems',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$110,000 - $140,000',
      posted: '2024-01-05',
      status: 'Active'
    }
  ]);

  // State for filtering and sorting
  const [applicationSearch, setApplicationSearch] = useState<string>('');
  const [jobSearch, setJobSearch] = useState<string>('');
  const [applicationSort, setApplicationSort] = useState<SortConfig>({ field: '', direction: '' });
  const [jobSort, setJobSort] = useState<SortConfig>({ field: '', direction: '' });

  // Filter and sort job applications
  const filteredApplications = useMemo(() => {
    let filtered = jobApplications.filter(app =>
      app.firstName.toLowerCase().includes(applicationSearch.toLowerCase()) ||
      app.lastName.toLowerCase().includes(applicationSearch.toLowerCase()) ||
      app.email.toLowerCase().includes(applicationSearch.toLowerCase()) ||
      app.jobPosition.toLowerCase().includes(applicationSearch.toLowerCase())
    );

    if (applicationSort.field) {
      filtered.sort((a, b) => {
        const aValue = a[applicationSort.field as keyof JobApplication];
        const bValue = b[applicationSort.field as keyof JobApplication];
        
        // Handle different types safely
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          if (applicationSort.direction === 'asc') {
            return aValue.localeCompare(bValue);
          } else {
            return bValue.localeCompare(aValue);
          }
        }
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          if (applicationSort.direction === 'asc') {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        }
        
        return 0;
      });
    }

    return filtered;
  }, [jobApplications, applicationSearch, applicationSort]);

  // Filter and sort job listings
  const filteredJobs = useMemo(() => {
    let filtered = jobListings.filter(job =>
      job.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
      job.company.toLowerCase().includes(jobSearch.toLowerCase()) ||
      job.location.toLowerCase().includes(jobSearch.toLowerCase())
    );

    if (jobSort.field && jobSort.direction) {
      filtered.sort((a, b) => {
        const aValue = a[jobSort.field as keyof JobListing];
        const bValue = b[jobSort.field as keyof JobListing];

        // Handle different types safely
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          if (jobSort.direction === 'asc') {
            return aValue.localeCompare(bValue);
          } else {
            return bValue.localeCompare(aValue);
          }
        }
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          if (jobSort.direction === 'asc') {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        }
        
        return 0;
      });
    }

    return filtered;
  }, [jobListings, jobSearch, jobSort]);

  const handleSort = (field: string, table: 'applications' | 'jobs'): void => {
    if (table === 'applications') {
      setApplicationSort((prev: SortConfig) => ({
        field,
        direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
      }));
    } else {
      setJobSort((prev: SortConfig) => ({
        field,
        direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
      }));
    }
  };

  const handleApplicationSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setApplicationSearch(event.target.value);
  };

  const handleJobSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setJobSearch(event.target.value);
  };

  const handleViewResume = (resume: string): void => {
    console.log('Viewing resume:', resume);
    // Add your view logic here
  };

  const handleDownloadResume = (resume: string): void => {
    console.log('Downloading resume:', resume);
    // Add your download logic here
  };

  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return dateString; // Fallback to original string if parsing fails
    }
  };

  const SortIcon: React.FC<SortIconProps> = ({ field, currentSort }) => {
    if (currentSort.field !== field) {
      return <ChevronUp className="sort-icon sort-icon-inactive" />;
    }
    return currentSort.direction === 'asc' ? 
      <ChevronUp className="sort-icon sort-icon-active" /> : 
      <ChevronDown className="sort-icon sort-icon-active" />;
  };

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <p>Welcome to your job application dashboard!</p>
      
      {/* Stats Overview */}
      <div className="stats-overview">
        <h2>Application Overview</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Applications</h3>
            <p className="stat-number">24</p>
          </div>
          <div className="stat-card">
            <h3>In Progress</h3>
            <p className="stat-number">8</p>
          </div>
          <div className="stat-card">
            <h3>Interviews</h3>
            <p className="stat-number">3</p>
          </div>
          <div className="stat-card">
            <h3>Rejected</h3>
            <p className="stat-number">13</p>
          </div>
        </div>
      </div>
      
      <div className="recent-applications">
        <h2>Recent Applications</h2>
        <div className="application-list">
          <div className="application-item">
            <h4>Software Engineer - Tech Corp</h4>
            <p>Applied: 2 days ago</p>
            <p>Status: Under Review</p>
          </div>
          <div className="application-item">
            <h4>Frontend Developer - Web Solutions</h4>
            <p>Applied: 1 week ago</p>
            <p>Status: Interview Scheduled</p>
          </div>
          <div className="application-item">
            <h4>Full Stack Developer - Startup Inc</h4>
            <p>Applied: 2 weeks ago</p>
            <p>Status: Application Submitted</p>
          </div>
        </div>
      </div>
{/* Job Applications Table */}
<div className="data-table-container">
          <div className="table-header">
            <h2>Job Applications</h2>
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search applications..."
                className="search-input"
                value={applicationSearch}
                onChange={handleApplicationSearchChange}
              />
            </div>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th 
                    className="sortable-header"
                    onClick={() => handleSort('id', 'applications')}
                  >
                    <div className="header-content">
                      <span>ID</span>
                      <SortIcon field="id" currentSort={applicationSort} />
                    </div>
                  </th>
                  <th 
                    className="sortable-header"
                    onClick={() => handleSort('firstName', 'applications')}
                  >
                    <div className="header-content">
                      <span>First Name</span>
                      <SortIcon field="firstName" currentSort={applicationSort} />
                    </div>
                  </th>
                  <th 
                    className="sortable-header"
                    onClick={() => handleSort('lastName', 'applications')}
                  >
                    <div className="header-content">
                      <span>Last Name</span>
                      <SortIcon field="lastName" currentSort={applicationSort} />
                    </div>
                  </th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th 
                    className="sortable-header"
                    onClick={() => handleSort('jobPosition', 'applications')}
                  >
                    <div className="header-content">
                      <span>Job Position</span>
                      <SortIcon field="jobPosition" currentSort={applicationSort} />
                    </div>
                  </th>
                  <th>Resume</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app: JobApplication) => (
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

        {/* Job Listings Table */}
        <div className="data-table-container">
          <div className="table-header">
            <h2>Available Jobs</h2>
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="search-input"
                value={jobSearch}
                onChange={handleJobSearchChange}
              />
            </div>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th 
                    className="sortable-header"
                    onClick={() => handleSort('id', 'jobs')}
                  >
                    <div className="header-content">
                      <span>ID</span>
                      <SortIcon field="id" currentSort={jobSort} />
                    </div>
                  </th>
                  <th 
                    className="sortable-header"
                    onClick={() => handleSort('title', 'jobs')}
                  >
                    <div className="header-content">
                      <span>Job Title</span>
                      <SortIcon field="title" currentSort={jobSort} />
                    </div>
                  </th>
                  <th 
                    className="sortable-header"
                    onClick={() => handleSort('company', 'jobs')}
                  >
                    <div className="header-content">
                      <span>Company</span>
                      <SortIcon field="company" currentSort={jobSort} />
                    </div>
                  </th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Salary</th>
                  <th 
                    className="sortable-header"
                    onClick={() => handleSort('posted', 'jobs')}
                  >
                    <div className="header-content">
                      <span>Posted</span>
                      <SortIcon field="posted" currentSort={jobSort} />
                    </div>
                  </th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job: JobListing) => (
                  <tr key={job.id}>
                    <td>{job.id}</td>
                    <td className="job-title">{job.title}</td>
                    <td>{job.company}</td>
                    <td>{job.location}</td>
                    <td>
                      <span className="job-type-badge">
                        {job.type}
                      </span>
                    </td>
                    <td>{job.salary}</td>
                    <td>{formatDate(job.posted)}</td>
                    <td>
                      <span className={`status-badge ${job.status.toLowerCase()}`}>
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  )
}

export default Dashboard
