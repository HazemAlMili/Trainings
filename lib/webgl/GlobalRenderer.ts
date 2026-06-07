"use client";
import { Renderer } from "ogl";

class GlobalWebGLRenderer {
  private static _instance: GlobalWebGLRenderer | null = null;
  readonly renderer!: Renderer;
  private _currentHost: HTMLElement | null = null;

  private constructor() {
    if (typeof window === "undefined") return;

    this.renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });

    const { gl } = this.renderer;
    Object.assign(gl.canvas.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: "0",
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    gl.clearColor(0, 0, 0, 0);
  }

  static get(): GlobalWebGLRenderer {
    if (!this._instance) this._instance = new GlobalWebGLRenderer();
    return this._instance;
  }

  mount(host: HTMLElement) {
    if (!this.renderer) return;
    if (this._currentHost === host) return;
    this._currentHost = host;
    host.appendChild(this.renderer.gl.canvas);
    this.resize(host.offsetWidth, host.offsetHeight);
  }

  resize(w: number, h: number) {
    if (!this.renderer) return;
    this.renderer.setSize(w, h);
  }

  destroy() {
    if (!this.renderer) return;
    this.renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
    GlobalWebGLRenderer._instance = null;
  }
}

export const globalGL = GlobalWebGLRenderer.get();
