import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/navigation'
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import About from './pages/about'
import Contact from './pages/contact'
import Apply from './pages/apply'
import NewJobPage from './pages/new-job'
import { HelloGraphQL } from './components/HelloGraphQL'

function App() {
  return (
    <div className="App">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/new-job" element={<NewJobPage />} />
          <Route path="/test-graphql" element={<HelloGraphQL />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
