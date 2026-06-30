import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030307, 0.005);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 85;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0x0a0a20, 2.0);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f0ff, 4.0, 150);
    pointLight1.position.set(40, 40, 40);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x9d00ff, 3.0, 150);
    pointLight2.position.set(-40, -40, 20);
    scene.add(pointLight2);

    // 5. Create Core 3D Objects
    
    // Object A: Interactive Neon Wave/Grid of Particles
    const particleCount = 1000;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorBlue = new THREE.Color('#00f0ff');
    const colorPurple = new THREE.Color('#9d00ff');
    const colorCyan = new THREE.Color('#00ffd8');

    for (let i = 0; i < particleCount; i++) {
      // Dust cloud shape
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 200;
      const z = (Math.random() - 0.5) * 150 - 30;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color interpolation
      const mixedColor = new THREE.Color();
      const r = Math.random();
      if (r < 0.4) {
        mixedColor.copy(colorBlue);
      } else if (r < 0.8) {
        mixedColor.copy(colorPurple);
      } else {
        mixedColor.copy(colorCyan);
      }

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom glowing particle texture using canvas
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(0, 240, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.4,
      map: createParticleTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const starParticles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(starParticles);

    // Object B: Central Wireframe Icosahedron (Geometric Core)
    const coreGeometry = new THREE.IcosahedronGeometry(22, 1);
    const coreWireframe = new THREE.WireframeGeometry(coreGeometry);
    
    const coreMaterial = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const coreMesh = new THREE.LineSegments(coreWireframe, coreMaterial);
    scene.add(coreMesh);

    // Object C: Inner Rotating Core Sphere
    const innerGeometry = new THREE.SphereGeometry(15, 16, 16);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x03030f,
      transparent: true,
      opacity: 0.8,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerMesh);

    // Inner wireframe with purple glow
    const innerWireframeGeom = new THREE.WireframeGeometry(new THREE.SphereGeometry(15.2, 12, 12));
    const innerWireframeMat = new THREE.LineBasicMaterial({
      color: 0x9d00ff,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const innerWireframe = new THREE.LineSegments(innerWireframeGeom, innerWireframeMat);
    scene.add(innerWireframe);

    // Object D: Orbital Rings
    const ringGroup = new THREE.Group();
    const ringCount = 3;
    const rings: THREE.Line[] = [];

    for (let r = 0; r < ringCount; r++) {
      const radius = 28 + r * 6;
      const ringGeom = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      const segments = 120;
      
      for (let s = 0; s <= segments; s++) {
        const theta = (s / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
      }
      
      ringGeom.setFromPoints(points);
      
      const ringMat = new THREE.LineBasicMaterial({
        color: r % 2 === 0 ? 0x00f0ff : 0x9d00ff,
        transparent: true,
        opacity: 0.3 - r * 0.08,
        blending: THREE.AdditiveBlending,
      });

      const ring = new THREE.Line(ringGeom, ringMat);
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      
      ringGroup.add(ring);
      rings.push(ring);
    }
    scene.add(ringGroup);

    // 6. Interactive Mouse Movement
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) / 100;
      mouseY = (e.clientY - window.innerHeight / 2) / 100;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = (e.touches[0].clientX - window.innerWidth / 2) / 100;
        mouseY = (e.touches[0].clientY - window.innerHeight / 2) / 100;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // 7. Responsive Resizing
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Slow continuous rotations
      starParticles.rotation.y = elapsedTime * 0.02;
      starParticles.rotation.x = elapsedTime * 0.005;

      coreMesh.rotation.y = elapsedTime * 0.12;
      coreMesh.rotation.x = elapsedTime * 0.08;

      innerWireframe.rotation.y = -elapsedTime * 0.18;
      innerWireframe.rotation.z = elapsedTime * 0.1;

      // Orbitals oscillation
      rings.forEach((ring, index) => {
        ring.rotation.y += 0.005 * (index + 1);
        ring.rotation.x += 0.002 * (index + 1);
        
        // Dynamic scale pulsating
        const scaleVal = 1 + Math.sin(elapsedTime * 1.5 + index) * 0.03;
        ring.scale.set(scaleVal, scaleVal, scaleVal);
      });

      // Camera mouse parallax interpolation (Inertia lerp)
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX * 1.8;
      camera.position.y = -targetY * 1.8;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup on Unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      // Clean up WebGL resources
      particleGeometry.dispose();
      particleMaterial.dispose();
      coreGeometry.dispose();
      coreWireframe.dispose();
      coreMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      innerWireframeGeom.dispose();
      innerWireframeMat.dispose();

      rings.forEach(ring => {
        ring.geometry.dispose();
        if (Array.isArray(ring.material)) {
          ring.material.forEach(m => m.dispose());
        } else {
          ring.material.dispose();
        }
      });

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      id="3d-background-canvas" 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
    />
  );
}
