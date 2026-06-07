"use client";
import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

interface DualityParticlesProps {
  mode: number;
}

const vertexShader = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform float uTime;
  uniform float uMode;
  uniform vec2 uResolution;
  varying vec2 vUv;

  vec3 ENGINEER_COLOR = vec3(0.365, 0.678, 0.886); // #5DADE2
  vec3 DESIGNER_COLOR = vec3(1.000, 0.549, 0.259); // #FF8C42

  void main() {
    float t = (uMode + 1.0) * 0.5;
    vec3 baseColor = mix(ENGINEER_COLOR, DESIGNER_COLOR, t);
    
    // Wave patterns for organic particle effect
    float w1 = sin(vUv.x * 20.0 + uTime * 0.5) * 0.5 + 0.5;
    float w2 = cos(vUv.y * 20.0 - uTime * 0.4) * 0.5 + 0.5;
    float intensity = w1 * w2;
    
    vec3 color = baseColor * (0.6 + intensity * 0.4);
    float alpha = 0.04 + intensity * 0.03;
    
    gl_FragColor = vec4(color, alpha);
  }
`;

export function DualityParticles({ mode }: DualityParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const programRef = useRef<Program | null>(null);

  // Keep mode uniform updated on changes
  useEffect(() => {
    if (programRef.current) {
      programRef.current.uniforms.uMode.value = mode;
    }
  }, [mode]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new Renderer({
      canvas,
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
    });
    
    const gl = renderer.gl;
    const geometry = new Triangle(gl);
    
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMode: { value: mode },
        uResolution: { value: [canvas.clientWidth, canvas.clientHeight] },
      },
    });

    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });

    const handleResize = () => {
      const w = canvas.parentElement?.clientWidth || window.innerWidth;
      const h = canvas.parentElement?.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value = [w, h];
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    let animationId: number;
    const animate = (t: number) => {
      animationId = requestAnimationFrame(animate);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    };
    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
