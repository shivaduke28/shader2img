import { useEffect, useRef } from "react";

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
        gl.viewport(0, 0, width, height);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
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