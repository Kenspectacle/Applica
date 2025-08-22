import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

function NewJobPage() {
  const [formData, setFormData] = useState({
    role: '',
    location: '',
    description: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const createJob = async (jobData: { role: string; location: string; description: string }) => {
    const mutation = `
      mutation CreateJob($createJobInput: CreateJobInput!) {
        createJob(createJobInput: $createJobInput) {
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
        query: mutation,
        variables: {
          createJobInput: {
            role: jobData.role,
            location: jobData.location,
            description: jobData.description,
            isArchived: false
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

    return result.data.createJob;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const newJob = await createJob(formData);
      console.log('Job created successfully:', newJob);
      alert('Job posted successfully!');
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Error creating job:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="new-job-page">
      <div className="form-container">
        <h1>Post New Job</h1>
        <p>Fill out the form below to post a new job opening.</p>
        
        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
            Error: {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="new-job-form">
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
              {isLoading ? 'Posting...' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewJobPage;