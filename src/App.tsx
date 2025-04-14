import { Dispatch, SetStateAction, useRef, useState } from 'react'
import './App.css'
import { WebGLCanvas } from './WebGLCanvas'
import GLSLEditor from './GLSLEditor';
import { Shader } from './Shader';

const resolustions = [
  256, 512, 720, 1024, 1080, 1440, 2048, 2160, 3840, 4096,
]

const updateResolution = (id: string, value: number, dispatch: Dispatch<SetStateAction<number>>) => {
  return (
    <div>
      <label htmlFor={id}>{id}: </label>
      <select id={id} value={value} onChange={(e) => {
        const value = parseInt(e.target.value);
        dispatch(value);
      }}>
        {resolustions.map((resolution) => (
          <option value={resolution} key={resolution}>
            {resolution}
          </option>
        ))}
      </select>
    </div>
  )
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shaderRef = useRef<Shader>(null);
  const glRef = useRef<WebGL2RenderingContext>(null);
  const [width, updateWidth] = useState(1080);
  const [height, updateHeight] = useState(720);

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
      <div style={{ display: "flex", gap: "1rem" }}>
        {updateResolution("width", width, updateWidth)}
        {updateResolution("height", height, updateHeight)}
      </div>
      <WebGLCanvas canvasRef={canvasRef} shaderRef={shaderRef} glRef={glRef} width={width} height={height} />
      <GLSLEditor shaderRef={shaderRef} glRef={glRef} />
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
