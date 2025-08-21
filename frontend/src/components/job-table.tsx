import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import { dbDateToRealDate } from '../utils/date-helpers';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';

const GET_JOBS = gql`
  query GetAllJobs {
    allJobs {
      id
      role
      location
      description
      isArchived
      creationDate
    }
  }
`;

interface Job {
    id: string;
    role: string;
    location: string;
    description: string;
    isArchived: boolean;
    creationDate: string;
}

interface SortIconProps {
    isSortable?: boolean;
    direction?: 'asc' | 'desc' | '';
}

function JobTable() {
    const { data } = useQuery(GET_JOBS);
    const jobs: Job[] = data?.allJobs || [];

    const [jobSearch, setJobSearch] = useState<string>('');


    const handleJobSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setJobSearch(event.target.value);
      };

    const SortIcon: React.FC<SortIconProps> = ({ isSortable = true, direction }) => {
        if (!isSortable) {
            return <ChevronUp className="sort-icon sort-icon-inactive" />;
        }
        return direction === 'asc' ? 
            <ChevronUp className="sort-icon sort-icon-active" /> : 
            <ChevronDown className="sort-icon sort-icon-active" />;
    };

    return(
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
                  >
                    <div className="header-content">
                      <span>ID</span>
                      <SortIcon isSortable={false} />
                    </div>
                  </th>
                  <th 
                    className="sortable-header"
                  >
                    <div className="header-content">
                      <span>Job Title</span>
                      <SortIcon direction={'desc'} />
                    </div>
                  </th>
                  <th 
                    className="sortable-header"
                  >
                    <div className="header-content">
                      <span>Location</span>
                      <SortIcon direction={'desc'} />
                    </div>
                  </th>
                  <th>Description</th>
                  <th 
                    className="sortable-header"
                  >
                    <div className="header-content">
                      <span>Posted</span>
                      <SortIcon direction={'desc'} />
                    </div>
                  </th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job: Job) => (
                  <tr key={job.id}>
                    <td>{job.id}</td>
                    <td className="job-title">{job.role}</td>
                    <td>{job.location}</td>
                    <td>
                      <span className="job-type-badge">
                        {job.description}
                      </span>
                    </td>
                    <td>{dbDateToRealDate(job.creationDate)}</td>
                    <td>
                      <span className={`status-badge ${job.isArchived ? "inactive" : "active"}`}>
                        {job.isArchived ? "Archived" : "Active"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    )};

export default JobTable