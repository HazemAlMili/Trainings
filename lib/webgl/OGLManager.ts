"use client";
import { Renderer, Program, Mesh, Triangle, Texture, Vec2, Flowmap } from "ogl";

class OGLSingletonManager {
  private static instance: OGLSingletonManager | null = null;
  private renderer!: Renderer;
  private program!: Program;
  private mesh!: Mesh;
  private flowmap!: Flowmap;
  private currentTexture: Texture | null = null;
  private animationId: number | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private mouse = new Vec2(-1);
  private velocity = new Vec2();
  private lastMouse = new Vec2(-1);
  private idleFrames = 0;

  static getInstance(): OGLSingletonManager {
    if (!this.instance) this.instance = new OGLSingletonManager();
    return this.instance;
  }

  attach(canvas: HTMLCanvasElement) {
    if (typeof window === "undefined") return;
    if (this.canvas === canvas) return;
    this.canvas = canvas;
    this.init(canvas);
  }

  private init(canvas: HTMLCanvasElement) {
    const gl = this.renderer?.gl;
    if (gl && gl.canvas !== canvas) {
      canvas.parentElement?.prepend(gl.canvas);
      return;
    }

    this.renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
    const { gl: newGl } = this.renderer;
    canvas.parentElement?.prepend(newGl.canvas);
    
    Object.assign(newGl.canvas.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
    });

    this.flowmap = new Flowmap(newGl, {
      falloff: 0.15,
      dissipation: 0.96,
    });

    const vertex = `
      attribute vec2 uv;
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
      }
    `;

    const fragment = `
      precision highp float;
      uniform sampler2D tWater;
      uniform sampler2D tFlow;
      uniform float uTime;
      varying vec2 vUv;

      void main() {
        vec3 flow = texture2D(tFlow, vUv).rgb;

        // Distort UV coordinate offsets based on flowmap velocity vector
        vec2 uv = vUv;
        uv += flow.rg * 0.04;

        vec4 color = texture2D(tWater, uv);

        // Chromatic aberration at flow hotspots
        float strength = length(flow.rg);
        vec4 colorR = texture2D(tWater, uv + flow.rg * 0.005);
        vec4 colorB = texture2D(tWater, uv - flow.rg * 0.005);
        color.r = mix(color.r, colorR.r, strength * 2.0);
        color.b = mix(color.b, colorB.b, strength * 2.0);

        gl_FragColor = color;
      }
    `;

    const geometry = new Triangle(newGl);

    this.program = new Program(newGl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        tWater: { value: new Texture(newGl) },
        tFlow: this.flowmap.uniform,
      },
    });

    this.mesh = new Mesh(newGl, { geometry, program: this.program });
  }

  async swapTexture(imageSrc: string) {
    if (!this.renderer) return;
    const { gl } = this.renderer;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    await img.decode();

    const newTexture = new Texture(gl, { image: img, generateMipmaps: false });

    // Dispose old texture reference (OGL GCs the GPU resource when dereferenced)
    this.currentTexture = null;
    this.currentTexture = newTexture;
    this.program.uniforms.tWater.value = newTexture;

    // Restart frame rendering loop
    this.idleFrames = 0;
    if (!this.animationId) this.startLoop();
  }

  updateMouse(x: number, y: number) {
    this.idleFrames = 0;
    this.velocity.set(x - this.lastMouse.x, y - this.lastMouse.y);
    this.mouse.set(x, y);
    this.lastMouse.set(x, y);
    if (!this.animationId) this.startLoop();
  }

  private startLoop() {
    const tick = (t: number) => {
      this.idleFrames++;
      this.program.uniforms.uTime.value = t * 0.001;

      this.flowmap.mouse.copy(this.mouse);
      this.flowmap.velocity.lerp(this.velocity, 0.1);
      this.velocity.set(0, 0);

      this.flowmap.update();
      this.renderer.render({ scene: this.mesh });

      if (this.idleFrames > 120) {
        this.animationId = null;
        return;
      }
      this.animationId = requestAnimationFrame(tick);
    };
    this.animationId = requestAnimationFrame(tick);
  }

  destroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (this.renderer) {
      this.renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
    OGLSingletonManager.instance = null;
  }
}

export const oglManager = OGLSingletonManager.getInstance();
