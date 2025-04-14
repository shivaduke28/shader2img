#version 300 es
precision highp float;

struct VertexOutput {
    vec2 uv;
};

in VertexOutput v_out;
out vec4 fragColor;

uniform float u_time;

void main() {
    vec2 uv = v_out.uv;
    fragColor = vec4(uv.x, uv.y, 0.0, 1.0);
}