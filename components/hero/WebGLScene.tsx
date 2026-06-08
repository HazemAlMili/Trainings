"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WebGLScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // ── SCENE & CAMERA ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    // ── RENDERER ──
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    containerRef.current.appendChild(renderer.domElement);

    // ── GEOMETRY & MATERIAL (Premium Metallic Torus Knot) ──
    const geometry = new THREE.TorusKnotGeometry(1.0, 0.3, 150, 20, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xff3e3e,
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
      flatShading: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // ── LIGHTS ──
    const ambientLight = new THREE.AmbientLight(0x0a0c10, 1.5);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0xff3e3e, 12, 15);
    light1.position.set(2, 3, 2);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x5dade2, 10, 15);
    light2.position.set(-2, -3, 2);
    scene.add(light2);

    const light3 = new THREE.PointLight(0xff8c42, 8, 15);
    light3.position.set(0, 0, -3);
    scene.add(light3);

    // ── MOUSE PARALLAX & ANIMATION ──
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (event: MouseEvent) => {
      mouse.targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (event.clientY / window.innerHeight - 0.5) * 2;
      idleFrames = 0; // Reset idle tracker
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── RESIZE HANDLE ──
    const onResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      idleFrames = 0;
    };
    window.addEventListener("resize", onResize);

    // ── ANIMATION LOOP WITH IDLE DETECTOR ──
    let animationFrameId: number;
    let idleFrames = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Interpolate mouse movements
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Rotate torus knot
      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.007;

      // Subtle parallax shift
      mesh.position.x = mouse.x * 0.4;
      mesh.position.y = -mouse.y * 0.3;

      // Rotate light positions dynamically for shimmering reflection
      const time = Date.now() * 0.001;
      light1.position.x = Math.sin(time) * 3;
      light1.position.y = Math.cos(time * 0.8) * 3;
      light2.position.x = -Math.sin(time * 0.8) * 3;
      light2.position.y = -Math.cos(time) * 3;

      renderer.render(scene, camera);

      // Increment idle frame count if mouse is stationary
      idleFrames++;
      if (idleFrames > 300) {
        // Slow down render loop when idle
        cancelAnimationFrame(animationFrameId);
        // Bind mouse movement to resume loop
        const resume = () => {
          window.removeEventListener("mousemove", resume);
          idleFrames = 0;
          animate();
        };
        window.addEventListener("mousemove", resume);
      }
    };

    animate();

    // ── CLEANUP ──
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (containerRef.current && renderer.domElement.parentNode) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full bg-transparent" />;
}
