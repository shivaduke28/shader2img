import { useState } from 'react'
import './App.css'
import { WebGLCanvas } from './WebGLCanvas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>shader2img</h1>
      <WebGLCanvas width={1080} height={720} />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
