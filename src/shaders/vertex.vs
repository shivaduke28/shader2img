#version 300 es

in vec2 a_position;

uniform float u_time;

void main() {
    vec2 pos = a_position;
    gl_Position = vec4(pos, 0.0, 1.0);
}