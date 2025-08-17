import { Link, useLocation } from 'react-router-dom'

function Navigation() {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/"><img className="logo" src="/src/assets/Applica.png" alt="Applica Logo" /></Link>
      </div>
      <div className="nav-center">
        <h2 className="website-header-text">Unified Job Application</h2>
      </div>
      <ul className="nav-links">
        <li className={isActive('/dashboard') ? 'active' : ''}>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className={isActive('/apply') ? 'active' : ''}>
          <Link to="/apply">Apply</Link>
        </li>
        <li className={isActive('/about') ? 'active' : ''}>
          <Link to="/about">About</Link>
        </li>
        <li className={isActive('/contact') ? 'active' : ''}>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
