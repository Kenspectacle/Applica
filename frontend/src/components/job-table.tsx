import { useQuery, gql } from '@apollo/client';
import { useState, useMemo } from 'react';
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
    currentSortField: string;
    direction?: 'asc' | 'desc';
}

function JobTable() {
    const { data } = useQuery(GET_JOBS);
    const jobs: Job[] = data?.allJobs || [];

    const [jobSearch, setJobSearch] = useState<string>('');
    const [activeSortTab, setActiveSortTab] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');


    const handleJobSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setJobSearch(event.target.value);
      };
    
      const handleSort = (field: string): void => {
        if (activeSortTab === field) {
            // Toggle direction if same field
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // New field, default to ascending
            setActiveSortTab(field);
            setSortDirection('desc');
        }
    };

    // Filtered and sorted jobs using useMemo for performance
    const filteredAndSortedJobs = useMemo(() => {
        let filtered = jobs.filter(job => {
            const searchTerm = jobSearch.toLowerCase();
            return (
                job.role.toLowerCase().includes(searchTerm) ||
                job.location.toLowerCase().includes(searchTerm) ||
                job.description.toLowerCase().includes(searchTerm) ||
                job.id.toLowerCase().includes(searchTerm)
            );
        });

        if (activeSortTab) {
            filtered.sort((a, b) => {
                let aValue: any;
                let bValue: any;

                // secondary sort comparison value
                let aValue2 = dbDateToRealDate(a.creationDate);
                let bValue2 = dbDateToRealDate(b.creationDate);

                switch (activeSortTab) {
                    case 'id':
                        aValue = a.id;
                        bValue = b.id;
                        if (aValue === bValue) {
                            aValue = aValue2
                            bValue = bValue2
                        } 
                        break;
                    case 'title':
                        aValue = a.role;
                        bValue = b.role;
                        if (aValue === bValue) {
                            aValue = aValue2
                            bValue = bValue2
                        }
                        break;
                    case 'location':
                        aValue = a.location;
                        bValue = b.location;
                        if (aValue === bValue) {
                            aValue = aValue2
                            bValue = bValue2
                        }
                        break;
                    case 'posted':
                        aValue = dbDateToRealDate(a.creationDate);
                        bValue = dbDateToRealDate(b.creationDate);
                        break;
                    default:
                        return 0;
                }

                // Handle string comparison
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                }

                if (aValue < bValue) {
                    return sortDirection === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortDirection === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return filtered;
    }, [jobs, jobSearch, activeSortTab, sortDirection]);

    const SortIcon: React.FC<SortIconProps> = ({ currentSortField }) => {
        if (currentSortField !== activeSortTab) {
            return <ChevronDown className="sort-icon sort-icon-inactive" />;
        }
        return sortDirection === 'asc' ? 
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
                    onClick={() => handleSort('id')}
                  >
                    <div className="header-content">
                      <span>ID</span>
                      <SortIcon currentSortField="id" />
                    </div>
                  </th>
                  <th 
                    className="sortable-header"
                    onClick={() => handleSort('title')}
                  >
                    <div className="header-content">
                      <span>Job Title</span>
                      <SortIcon currentSortField="title" />
                    </div>
                  </th>
                  <th 
                    className="sortable-header"
                    onClick={() => handleSort('location')}
                  >
                    <div className="header-content">
                      <span>Location</span>
                      <SortIcon currentSortField="location" />
                    </div>
                  </th>
                  <th>Description</th>
                  <th 
                    className="sortable-header"
                    onClick={() => handleSort('posted')}
                  >
                    <div className="header-content">
                      <span>Posted</span>
                      <SortIcon currentSortField="posted" />
                    </div>
                  </th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedJobs.map((job: Job) => (
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