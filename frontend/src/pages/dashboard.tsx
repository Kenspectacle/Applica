import JobTable from '../components/job-table';
import JobApplicationTable from '../components/job-application-table';

function Dashboard() {
  // Sample data for job applications

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
      <JobApplicationTable />
      <JobTable />
    </div>
  )
}

export default Dashboard
