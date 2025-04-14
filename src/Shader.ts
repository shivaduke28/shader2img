import vertexShaderSource from './shaders/vertex.vs?raw'
import fragmentShaderSource from './shaders/fragment.fs?raw'

export type Uniforms = {
    time: number,
}

export type Shader = {
    program: WebGLProgram,
    attributeLocations: {
        position: number,
    },
    uniformLocations: {
        time: WebGLUniformLocation | null,
    }
}

const createProgram = (gl: WebGL2RenderingContext): WebGLProgram | null => {
    const createShader = (type: number, source: string): WebGLShader | null => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return null;
    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        return null;
    }
    return program;
}

export const createShader = (gl: WebGL2RenderingContext): Shader | null => {
    const program = createProgram(gl);
    if (!program) return null;

    const attributeLocations = {
        position: gl.getAttribLocation(program, 'a_position'),
    };

    const uniformLocations = {
        time: gl.getUniformLocation(program, 'u_time'),
    };

    return {
        program,
        attributeLocations,
        uniformLocations,
    };
}

export const bindUniforms = (gl: WebGL2RenderingContext,
    shader: Shader,
    uniforms: Uniforms) => {
    const uniformLocations = shader.uniformLocations;

    gl.useProgram(shader.program);
    gl.uniform1f(uniformLocations.time, uniforms.time);
}