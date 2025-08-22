import { useQuery, gql } from '@apollo/client';
import { useState, useMemo } from 'react';
import { dbDateToRealDate } from '../utils/date-helpers';
import { Search, ChevronUp, ChevronDown, Edit, Archive, ArchiveRestore, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom'

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
}

function JobTable() {
    const { data, refetch } = useQuery(GET_JOBS);
    const jobs: Job[] = data?.allJobs || [];

    const [jobSearch, setJobSearch] = useState<string>('');
    const [activeSortTab, setActiveSortTab] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const updateJobArchive = async (jobId: string, currentArchiveStatus: boolean) => {
      const mutation = `
          mutation UpdateJob($id: String!, $updateJobInput: UpdateJobInput!) {
              updateJob(id: $id, updateJobInput: $updateJobInput) {
                  id
                  isArchived
              }
          }
      `;
  
      const response = await fetch('http://localhost:3000/graphql', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              query: mutation,
              variables: {
                  id: jobId,
                  updateJobInput: {
                      isArchived: !currentArchiveStatus // Toggle the current status
                  }
              }
          })
      });
  
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      
      if (result.errors) {
          throw new Error(result.errors[0].message || 'GraphQL error occurred');
      }
  
      return result.data.updateJob;
  };

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

    const handleToggleArchive = async (jobId: string, isArchived: boolean): Promise<void> => {
      try {
          await updateJobArchive(jobId, isArchived);
          // Refetch the data to update the UI
          await refetch();
          console.log(`Job ${jobId} archive status toggled successfully`);
      } catch (error) {
          console.error('Error toggling archive status:', error);
          alert('Failed to update job status. Please try again.');
      }
  };

    const handleDelete = (jobId: string): void => {
      console.log('Delete job:', jobId);
      // Add your delete logic here
    };

    const handleEdit = (jobId: string): void => {
      console.log('Edit job:', jobId);
      // Add your edit logic here
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
                  <th>
                    <div className="header-content">
                      <span>Actions</span>
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
                    <td className="actions-cell">
                      <div className="action-buttons">
                        <Link
                          to={`/edit-job/${job.id}`}
                          className="action-button edit-button"
                          title="Edit job"
                        >
                          <button
                            className="action-button edit-button"
                            onClick={() => handleEdit(job.id)}
                            title="Edit job"
                          > Edit
                            <Edit size={16} />
                          </button>
                        </Link>
                        <button
                          className="action-button archive-button"
                          onClick={() => handleToggleArchive(job.id, job.isArchived)}
                          title={job.isArchived ? "Unarchive job" : "Archive job"}
                        > {job.isArchived ? "Unarchive job" : "Archive job"}
                          {job.isArchived ? <ArchiveRestore size={16} /> : <Archive size={16} />}
                        </button>
                        <button
                          className="action-button delete-button"
                          onClick={() => handleDelete(job.id)}
                          title="Delete job"
                        > Delete
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
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