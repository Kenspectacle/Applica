import reactLogo from '/src/assets/react.svg'
import { Link } from 'react-router-dom'

function Home() {

    return (
        <>
            <div>
                <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Apply all in one place</h1>
            <div className="card">
                Simplicity at its best
            </div>
            <button className="getting-started-button">
                <Link to="/apply">Getting started!</Link>
            </button>
            
        </>
    )
}

export default Home