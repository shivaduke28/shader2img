import { useRef } from 'react'
import './App.css'
import { WebGLCanvas } from './WebGLCanvas'
import GLSLEditor from './GLSLEditor';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const saveImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'shader.png';
    link.click();
    link.remove();
  };

  return (
    <>
      <h1>shader2img</h1>
      <WebGLCanvas ref={canvasRef} width={1920} height={1080} />
      <GLSLEditor />
      <div className="card">
        <button onClick={saveImage}>
          save .png
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
