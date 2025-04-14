import { useEffect, useRef } from "react";
import { bindUniforms, createShader, Uniforms } from "./Shader";

type WebGLCanvasProps = {
    width?: number;
    height?: number;
};

export const WebGLCanvas: React.FC<WebGLCanvasProps> = ({ width = 1080, height = 720 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const glRef = useRef<WebGL2RenderingContext>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext("webgl2");
        if (!gl) return;
        glRef.current = gl;

        const shader = createShader(gl);
        if (!shader) return;
        gl.useProgram(shader.program);

        const vertices = new Float32Array([
            -1.0, -1.0,
            1.0, -1.0,
            -1.0, 1.0,
            1.0, -1.0,
            1.0, 1.0,
            -1.0, 1.0,
        ]);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        const positionLocation = shader.attributeLocations.position;
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        // no depth
        gl.disable(gl.DEPTH_TEST);

        const uniforms: Uniforms = {
            time: 0,
        }

        const deltaTimeMs = 1000.0 / 60.0;
        const startTimeMs = performance.now();
        let timerId = 0;

        const renderLoop = () => {
            uniforms.time = (performance.now() - startTimeMs) / 1000;
            bindUniforms(gl, shader, uniforms);

            gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);

            timerId = setTimeout(renderLoop, deltaTimeMs);
        };

        renderLoop();

        return () => {
            if (timerId > 0) {
                clearTimeout(timerId);
            }
        }
    });

    useEffect(() => {
        const gl = glRef.current;
        if (!gl) return;
        gl.viewport(0, 0, width, height);
    }, [width, height]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            style={{
                maxWidth: "100%",
                height: "auto",
            }}
        ></canvas>
    )
}