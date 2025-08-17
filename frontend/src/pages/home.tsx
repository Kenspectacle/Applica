import reactLogo from '/src/assets/react.svg'

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
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default Home