precision mediump float;

uniform float uTime;
uniform float uMode;          // -1.0 = engineer, +1.0 = designer, 0.0 = hybrid
uniform vec2  uResolution;

vec3 ENGINEER_COLOR = vec3(0.365, 0.678, 0.886); // #5DADE2 (cool blue)
vec3 DESIGNER_COLOR = vec3(1.000, 0.549, 0.259); // #FF8C42 (warm amber)

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  // Normalize uMode from [-1, 1] to [0, 1]
  float t = (uMode + 1.0) * 0.5;
  
  // Mix colors based on slider mode
  vec3 color = mix(ENGINEER_COLOR, DESIGNER_COLOR, t);
  
  // Slow moving wave alpha glow effect
  float alpha = 0.05 + sin(uTime * 0.8 + uv.x * 6.0 + uv.y * 3.0) * 0.03;
  
  gl_FragColor = vec4(color, alpha);
}
