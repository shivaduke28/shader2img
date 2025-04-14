#version 300 es

in vec2 a_position;
in vec2 a_uv;

struct VertexOutput {
    vec2 uv;
};

out VertexOutput v_out;

uniform float u_time;

void main() {
    vec2 pos = a_position;
    gl_Position = vec4(pos, 0.0, 1.0);
    v_out.uv = pos * 0.5 + .5;
}