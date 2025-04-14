import vertexShaderSource from './shaders/vertex.vs?raw'
import fragmentShaderSource from './shaders/fragment.fs?raw'
import { vec2 } from 'gl-matrix'

export type Uniforms = {
    time: number,
    resolution: vec2,
}

export { fragmentShaderSource }

export type Shader = {
    vertex: WebGLShader,
    fragment: WebGLShader,
    program: WebGLProgram,
    attributeLocations: {
        position: number,
    },
    uniformLocations: {
        time: WebGLUniformLocation | null,
        resolution: WebGLUniformLocation | null,
    }
}


export const createShader = (gl: WebGL2RenderingContext): Shader | null => {
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

    const attributeLocations = {
        position: gl.getAttribLocation(program, 'a_position'),
    };

    const uniformLocations = {
        time: gl.getUniformLocation(program, 'u_time'),
        resolution: gl.getUniformLocation(program, 'u_resolution'),
    };

    return {
        vertex: vertexShader,
        fragment: fragmentShader,
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
    gl.uniform2fv(uniformLocations.resolution, uniforms.resolution);
}

export const updateFragmentShader = (gl: WebGL2RenderingContext,
    shader: Shader,
    fragmentShaderStr: string) => {
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) return;
    gl.shaderSource(fragmentShader, fragmentShaderStr);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(fragmentShader));
        gl.deleteShader(fragmentShader);
        return;
    }
    gl.detachShader(shader.program, shader.fragment);
    gl.deleteShader(shader.fragment);
    gl.attachShader(shader.program, fragmentShader);
    gl.linkProgram(shader.program);
    if (!gl.getProgramParameter(shader.program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(shader.program));
        return;
    }
    shader.fragment = fragmentShader;
    gl.useProgram(shader.program);
    shader.attributeLocations.position = gl.getAttribLocation(shader.program, 'a_position');
    shader.uniformLocations.time = gl.getUniformLocation(shader.program, 'u_time');
    shader.uniformLocations.resolution = gl.getUniformLocation(shader.program, 'u_resolution');
};
