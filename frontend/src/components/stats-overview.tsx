import type { JobApplication } from '../types/JobApplication';

interface JobApplicationTableProps {
  jobApplications: JobApplication[];
}

const countApplicationStatusType = (jobApplications: JobApplication[], attribute: string): string  => {
    return jobApplications
        .filter(jobApplication => jobApplication.applicationStatus === attribute)
        .length
        .toString();
}

function StatsOverview({jobApplications}: JobApplicationTableProps) {
    return (
        <>
            <div className="stats-overview">
                <h2>Application Overview</h2>
                <div className="stat-card">
                    <h3>Total Applications</h3>
                    <p className="stat-number">{jobApplications.length}</p>
            </div>
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Received</h3>
                    <p className="stat-number">{countApplicationStatusType(jobApplications, 'RECEIVED')}</p>
                </div>
                <div className="stat-card">
                    <h3>Review</h3>
                    <p className="stat-number">{countApplicationStatusType(jobApplications, 'REVIEW')}</p>
                </div>
                <div className="stat-card">
                    <h3>Interview</h3>
                    <p className="stat-number">{countApplicationStatusType(jobApplications, 'INTERVIEW')}</p>
                </div>
                <div className="stat-card">
                    <h3>Offer</h3>
                    <p className="stat-number">{countApplicationStatusType(jobApplications, 'OFFER')}</p>
                </div>
                <div className="stat-card">
                    <h3>Hired</h3>
                    <p className="stat-number">{countApplicationStatusType(jobApplications, 'HIRED')}</p>
                </div>
                <div className="stat-card">
                    <h3>Rejected</h3>
                    <p className="stat-number">{countApplicationStatusType(jobApplications, 'REJECTED')}</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default StatsOverview