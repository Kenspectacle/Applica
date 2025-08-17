import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/navigation'
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import About from './pages/about'
import Contact from './pages/contact'

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
        </Routes>
      </main>
    </div>
  )
}

export default App
