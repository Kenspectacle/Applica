import { useState } from 'react'
import { useQuery, gql } from '@apollo/client';

const GET_ACTIVE_JOBS = gql`
query GetAllActiveJobs {
  activeJobs {
    role
    location
  }
}
`;

interface JobRole {
    id: string;
    role: string;
    location: string;
}


function Apply() {
  const { data } = useQuery(GET_ACTIVE_JOBS);
  const jobs: JobRole[] = data?.activeJobs || [];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    job: '',
    resume: null as File | null,
    addressCountry: '',
    addressCity: '',
    addressStreet: '',
    addressStreetNumber: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Application submitted:', formData)
    // Here you would typically send the data to your backend
    alert('Application submitted successfully!')
  }

  const [fileError, setFileError] = useState('');

  return (
    <div className="apply-page">
      <h1>Job Application</h1>
      <p>Fill out the form below to submit your job application.</p>
      <small>* is required</small>
      
      <form onSubmit={handleSubmit} className="application-form">
        
        <div className="form-group">
          <label htmlFor="firstName">First Name*</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="lastName">Last Name*</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        
          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={(e) => {
                const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
                e.target.setCustomValidity(
                  !isValid && e.target.value ? 'Please enter a valid email address' : ''
                );
              }}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <small>Optional</small>
          </div>

           <div className="form-group">
      <label htmlFor="addressCountry">Country Address*</label>
      <input
        type="text"
        id="addressCountry"
        name="addressCountry"
        value={formData.addressCountry}
        onChange={handleInputChange}
        required
      />
    </div>
    
    <div className="form-group">
      <label htmlFor="addressCity">City Address*</label>
      <input
        type="text"
        id="addressCity"
        name="addressCity"
        value={formData.addressCity}
        onChange={handleInputChange}
        required
      />
    </div>
    
    <div className="form-group">
      <label htmlFor="addressStreet">Street Address*</label>
      <input
        type="text"
        id="addressStreet"
        name="addressStreet"
        value={formData.addressStreet}
        onChange={handleInputChange}
        required
      />
    </div>
    
    <div className="form-group">
      <label htmlFor="addressStreetNumber">Street Number</label>
      <input
        type="text"
        id="addressStreetNumber"
        name="addressStreetNumber"
        value={formData.addressStreetNumber}
        onChange={handleInputChange}
      />
      <small>Optional</small>
    </div>
          
          <div className="form-group">
          <label htmlFor="job">Role*</label>
          <select
            id="job"
            name="job"
            value={formData.job}
            onChange={handleInputChange}
            required
          >
            {jobs.map((job: JobRole) => (
              <option value={job.id}>
                {job.role} {job.location}
              </option>
            ))}
          </select>
        </div>
          
        <div className="form-group">
          <label htmlFor="resume">Resume/CV*</label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={(e) => {
              const file = e.target.files?.[0];
              
              if (file) {
                if (file.size > 10 * 1024 * 1024) {
                  e.target.value = '';
                  setFileError('File size must be less than 10MB');
                  return;
                }
                setFileError(''); // Clear error
              }
              
              setFormData(prev => ({ ...prev, resume: file || null }));
            }}
            className={fileError ? 'error' : ''}
            required
          />
          <small>Accepted formats: PDF, DOC, DOCX (Max 10MB)</small>
          {fileError && <span className="error-message">{fileError}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Submit Application</button>
          <button type="button" className="reset-btn" onClick={() => setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            job: '',
            resume: null,
            addressCountry: '',
            addressCity: '',
            addressStreet: '',
            addressStreetNumber: ''
          })}>
            Reset Form
          </button>
        </div>
      </form>
    </div>
  )
}

export default Apply
