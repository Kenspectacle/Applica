import { useState } from 'react'
import { useQuery, gql } from '@apollo/client';
import { supabase } from '../supabase-client';

const GET_ACTIVE_JOBS = gql`
query GetAllActiveJobs {
  activeJobs {
    id
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
    jobId: '',
    resume: null as File | null,
    addressCountry: '',
    addressCity: '',
    addressPostalCode: '',
    addressStreet: '',
    addressStreetNumber: ''
  })

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  let resumeURL = '';

  const createJobApplication = async (formData: any) => {
    const mutation = `
      mutation createJobApplication($input: CreateJobApplicationInput!) {
        createJobApplication(input: $input) {
          firstName
          lastName
          resumeURL
          email
          phone
          jobId
          addressCountry
          addressCity
          addressPostalCode
          addressStreet
          addressStreetNumber
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
          input: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            resumeURL: resumeURL,
            email: formData.email,
            phone: formData.phone || null,
            jobId: formData.jobId,
            addressCountry: formData.addressCountry,
            addressCity: formData.addressCity,
            addressPostalCode: formData.addressPostalCode,
            addressStreet: formData.addressStreet,
            addressStreetNumber: formData.addressStreetNumber || null,
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
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const uploadToSupabase = async (file: File, fileName: string) => {
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("Resume Bucket") // your bucket name
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });
    
  if (error) {
    console.error("Upload failed:", error.message);
    setSubmitError(error.message);
    return;
  }

  // Get public URL
  const { data: urlData } = supabase
    .storage
    .from("Resume Bucket")
    .getPublicUrl(fileName);

  resumeURL = urlData.publicUrl;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const file = formData.resume!;
    const fileName = `${Date.now()}-${file.name}`;

    try {
      await uploadToSupabase(file, fileName);
      console.log(formData);
      console.log(resumeURL);
      await createJobApplication(formData);
      setSubmitSuccess(true);
    } catch (error: any) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  const [fileError, setFileError] = useState('');

  return (
    <div className="apply-page">
      <h1>Job Application</h1>
      <p>Fill out the form below to submit your job application.</p>
      <small>* is required</small>
      
      {submitSuccess && (
        <div className="success-message">
          <strong>Success!</strong> Your application has been submitted successfully.
        </div>
      )}

      {submitError && (
        <div className="error-message">
          <strong>Error:</strong> {submitError}
        </div>
      )}

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
      <label htmlFor="addressPostalCode">Postal Code*</label>
      <input
        type="text"
        id="addressPostalCode"
        name="addressPostalCode"
        value={formData.addressPostalCode}
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
          <label htmlFor="jobId">Role*</label>
          <select
            id="jobId"
            name="jobId"
            value={formData.jobId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a position...</option>
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
          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
          <button type="button" className="reset-btn" onClick={() => setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            jobId: '',
            resume: null,
            addressCountry: '',
            addressCity: '',
            addressPostalCode: '',
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
