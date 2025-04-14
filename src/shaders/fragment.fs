#version 300 es
precision highp float;

out vec4 fragColor;

uniform float u_time;
uniform vec2 u_resolution;

void main(void) {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    fragColor = vec4(uv, sin(u_time), 1.0);
}