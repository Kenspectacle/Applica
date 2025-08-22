import { useState, useEffect } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditJobPage() {
  const [formData, setFormData] = useState({
    role: '',
    location: '',
    description: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingJob, setIsLoadingJob] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();

  const fetchJob = async (id: string) => {
    const query = `
      query GetJob($id: String!) {
        job(id: $id) {
          id
          role
          location
          description
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
        query,
        variables: { id }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.errors) {
      throw new Error(result.errors[0].message || 'GraphQL error occurred');
    }

    return result.data.job;
  };

  useEffect(() => {
    const loadJob = async () => {
      if (!jobId) {
        setError('Job ID is required');
        setIsLoadingJob(false);
        return;
      }

      try {
        const job = await fetchJob(jobId);
        setFormData({
          role: job.role,
          location: job.location,
          description: job.description
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load job';
        setError(errorMessage);
        console.error('Error fetching job:', err);
      } finally {
        setIsLoadingJob(false);
      }
    };

    loadJob();
  }, [jobId]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const updateJob = async (jobData: { role: string; location: string; description: string }) => {
    const mutation = `
      mutation UpdateJob($id: String!, $updateJobInput: UpdateJobInput!) {
        updateJob(id: $id, updateJobInput: $updateJobInput) {
          id
          role
          location
          description
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
            role: jobData.role,
            location: jobData.location,
            description: jobData.description
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const updatedJob = await updateJob(formData);
      console.log('Job updated successfully:', updatedJob);
      alert('Job updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Error updating job:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  if (isLoadingJob) {
    return (
      <div className="edit-job-page">
        <div className="form-container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            Loading job details...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-job-page">
      <div className="form-container">
        <h1>Edit Job</h1>
        <p>Update the job details below.</p>
        
        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
            Error: {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="edit-job-form">
          <div className="form-group">
            <label htmlFor="role">Job Role *</label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="e.g. Frontend Developer, Product Manager"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g. New York, NY or Remote"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Job Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the job responsibilities, requirements, and qualifications..."
              rows={6}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditJobPage;