import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Compass, Eye, RotateCw, Layers, Award, Radio } from 'lucide-react';
import { COLLEGE_DATA } from '../data/collegeData.ts';

interface Campus3DVisualizerProps {
  isAiSpeaking?: boolean;
  onSelectDepartment?: (deptName: string) => void;
  activeTopic?: string;
}

export const Campus3DVisualizer: React.FC<Campus3DVisualizerProps> = ({
  isAiSpeaking = false,
  onSelectDepartment,
  activeTopic
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeViewMode, setActiveViewMode] = useState<'orbit' | 'departments' | 'matrix'>('orbit');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNodeInfo, setSelectedNodeInfo] = useState<string | null>('E.G.S. Pillay Engineering College (Autonomous) - TNEA 3806');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const innerPolyRef = useRef<THREE.Mesh | null>(null);
  const ring1Ref = useRef<THREE.Group | null>(null);
  const ring2Ref = useRef<THREE.Group | null>(null);
  const ring3Ref = useRef<THREE.Group | null>(null);
  const deptGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 360;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.1,
      1000
    );
    camera.position.set(0, 5, 26);
    cameraRef.current = camera;

    // Renderer with try-catch for WebGL support
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'default' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.innerHTML = '';
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch (e) {
      console.warn('WebGL is not supported or failed to initialize:', e);
      return;
    }

    // Ambient & Point Lights
    const ambientLight = new THREE.AmbientLight(0x0f2b5c, 2.5);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xf59e0b, 4, 50);
    goldLight.position.set(8, 12, 12);
    scene.add(goldLight);

    const blueLight = new THREE.PointLight(0x38bdf8, 5, 60);
    blueLight.position.set(-10, -8, 10);
    scene.add(blueLight);

    const cyanCenterLight = new THREE.PointLight(0x06b6d4, 3, 20);
    cyanCenterLight.position.set(0, 0, 0);
    scene.add(cyanCenterLight);

    // ==========================================
    // 1. Central Holographic Core (EGSPEC AI Core)
    // ==========================================
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner glowing sphere
    const coreGeo = new THREE.SphereGeometry(2.4, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);
    coreMeshRef.current = coreMesh;

    // Inner geometric cage (Icosahedron)
    const polyGeo = new THREE.IcosahedronGeometry(2.9, 1);
    const polyMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const innerPoly = new THREE.Mesh(polyGeo, polyMat);
    coreGroup.add(innerPoly);
    innerPolyRef.current = innerPoly;

    // ==========================================
    // 2. Orbital Rings (Engineering Pillars)
    // ==========================================
    const createRing = (radius: number, tube: number, color: number, tiltX: number, tiltY: number) => {
      const group = new THREE.Group();
      const ringGeo = new THREE.TorusGeometry(radius, tube, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.3,
        roughness: 0.3,
        metalness: 0.9,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      group.add(ringMesh);
      group.rotation.x = tiltX;
      group.rotation.y = tiltY;
      scene.add(group);
      return group;
    };

    ring1Ref.current = createRing(5.2, 0.05, 0x38bdf8, Math.PI / 4, 0.2); // Computing & AI
    ring2Ref.current = createRing(7.2, 0.05, 0xf59e0b, -Math.PI / 3, 0.4); // Core Eng & Automation
    ring3Ref.current = createRing(9.4, 0.05, 0x10b981, Math.PI / 6, -0.5); // Research & Innovation

    // ==========================================
    // 3. Department Nodes Orbiting in 3D
    // ==========================================
    const deptGroup = new THREE.Group();
    scene.add(deptGroup);
    deptGroupRef.current = deptGroup;

    const departmentList = [
      { name: 'AI & Data Science', code: 'AI&DS', radius: 6.8, speed: 0.4, color: 0x38bdf8, angle: 0 },
      { name: 'Computer Science (CSE)', code: 'CSE', radius: 7.6, speed: 0.35, color: 0x60a5fa, angle: 1.1 },
      { name: 'Cyber Security', code: 'CYBER', radius: 8.2, speed: 0.3, color: 0xa855f7, angle: 2.2 },
      { name: 'Information Tech (IT)', code: 'IT', radius: 6.2, speed: 0.45, color: 0x22d3ee, angle: 3.3 },
      { name: 'Electronics & Comm (ECE)', code: 'ECE', radius: 8.8, speed: 0.28, color: 0xf59e0b, angle: 4.4 },
      { name: 'Mechanical Eng (MECH)', code: 'MECH', radius: 9.6, speed: 0.24, color: 0xef4444, angle: 5.2 },
      { name: 'Electrical & Electronics (EEE)', code: 'EEE', radius: 7.2, speed: 0.38, color: 0x10b981, angle: 2.8 },
      { name: 'Biomedical Eng (BME)', code: 'BME', radius: 8.4, speed: 0.32, color: 0xec4899, angle: 0.6 },
      { name: 'Management (MBA)', code: 'MBA', radius: 10.2, speed: 0.22, color: 0xfbbf24, angle: 3.9 },
      { name: 'Master of Comp Apps (MCA)', code: 'MCA', radius: 6.5, speed: 0.42, color: 0x14b8a6, angle: 1.8 },
    ];

    const nodeMeshes: { mesh: THREE.Mesh; halo: THREE.Mesh; data: typeof departmentList[0] }[] = [];

    departmentList.forEach((dept) => {
      const nodeNodeGroup = new THREE.Group();
      
      const nodeGeo = new THREE.SphereGeometry(0.48, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: dept.color,
        emissive: dept.color,
        emissiveIntensity: 0.5,
        roughness: 0.2,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.userData = { deptName: dept.name, code: dept.code };

      // Surrounding glowing beacon halo
      const haloGeo = new THREE.RingGeometry(0.65, 0.75, 24);
      const haloMat = new THREE.MeshBasicMaterial({
        color: dept.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.lookAt(0, 0, 1);

      nodeNodeGroup.add(nodeMesh);
      nodeNodeGroup.add(haloMesh);
      deptGroup.add(nodeNodeGroup);

      nodeMeshes.push({ mesh: nodeMesh, halo: haloMesh, data: dept });
    });

    // ==========================================
    // 4. Background Particle Constellation
    // ==========================================
    const particleCount = 750;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colBlue = new THREE.Color(0x38bdf8);
    const colGold = new THREE.Color(0xf59e0b);
    const colNavy = new THREE.Color(0x1e3a8a);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 12 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i3 + 2] = radius * Math.cos(phi);

      const mixedCol = Math.random() > 0.4 ? colBlue : (Math.random() > 0.5 ? colGold : colNavy);
      particleColors[i3] = mixedCol.r;
      particleColors[i3 + 1] = mixedCol.g;
      particleColors[i3 + 2] = mixedCol.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // Mouse Move Parallax
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePos.current.targetX = x * 1.5;
      mousePos.current.targetY = y * 1.5;

      // Raycasting for interactive node tooltips
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map(n => n.mesh));
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const name = (hit.userData as any)?.deptName;
        setHoveredNode(name || null);
        container.style.cursor = 'pointer';
      } else {
        setHoveredNode(null);
        container.style.cursor = 'grab';
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map(n => n.mesh));
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const name = (hit.userData as any)?.deptName;
        if (name) {
          setSelectedNodeInfo(`Selected: ${name} (Intake & Syllabus Available)`);
          if (onSelectDepartment) {
            onSelectDepartment(name);
          }
        }
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);

    // Resize Handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // ==========================================
    // Animation Loop
    // ==========================================
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      camera.position.x = mousePos.current.x * 2.5;
      camera.position.y = 5 + mousePos.current.y * 1.5;
      camera.lookAt(0, 0, 0);

      // Core rotations & pulse
      if (coreMeshRef.current) {
        coreMeshRef.current.rotation.y = elapsedTime * 0.2;
        const scaleVal = 1 + Math.sin(elapsedTime * 2.5) * 0.04;
        coreMeshRef.current.scale.set(scaleVal, scaleVal, scaleVal);
      }
      if (innerPolyRef.current) {
        innerPolyRef.current.rotation.x = elapsedTime * 0.35;
        innerPolyRef.current.rotation.z = elapsedTime * 0.25;
      }

      // Orbital Rings Rotation
      if (ring1Ref.current) ring1Ref.current.rotation.z = elapsedTime * 0.15;
      if (ring2Ref.current) ring2Ref.current.rotation.z = -elapsedTime * 0.12;
      if (ring3Ref.current) ring3Ref.current.rotation.z = elapsedTime * 0.08;

      // Orbiting Department Nodes
      nodeMeshes.forEach(({ mesh, halo, data }) => {
        const curAngle = data.angle + elapsedTime * data.speed;
        const parent = mesh.parent;
        if (parent) {
          parent.position.x = Math.cos(curAngle) * data.radius;
          parent.position.z = Math.sin(curAngle) * data.radius;
          parent.position.y = Math.sin(elapsedTime * 1.8 + data.angle) * 1.5;

          // Halo billboard faces camera
          halo.lookAt(camera.position);
          
          // Hover / active scale effect
          const isTargeted = hoveredNode === data.name || (activeTopic && activeTopic.toLowerCase().includes(data.code.toLowerCase()));
          const targetScale = isTargeted ? 1.6 : 1.0;
          mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
      });

      // Background particles rotate gently
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Effect to pulse core when AI is speaking/generating
  useEffect(() => {
    if (!coreMeshRef.current) return;
    const mat = coreMeshRef.current.material as THREE.MeshStandardMaterial;
    if (isAiSpeaking) {
      mat.emissive.setHex(0xf59e0b);
      mat.emissiveIntensity = 1.0;
    } else {
      mat.emissive.setHex(0x0369a1);
      mat.emissiveIntensity = 0.6;
    }
  }, [isAiSpeaking]);

  const resetCamera = () => {
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 5, 26);
      mousePos.current.targetX = 0;
      mousePos.current.targetY = 0;
    }
  };

  return (
    <div className="relative w-full h-[360px] md:h-[440px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-950 via-[#0a192f] to-slate-900 border border-slate-800 shadow-2xl">
      {/* 3D Canvas Mount */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Floating Badge Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-sky-500/30 text-xs shadow-lg pointer-events-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-sky-200">EGSPEC 3D Holographic Core</span>
          <span className="text-slate-400">|</span>
          <span className="text-amber-400 font-bold tracking-wider">TNEA 3806</span>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <div className="bg-amber-500/10 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/30 text-xs font-semibold text-amber-300 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            NAAC 'A++' Accredited (Autonomous)
          </div>
        </div>
      </div>

      {/* Bottom Floating Interactive Controller */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none">
        {/* Node Status or Hover Feedback */}
        <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700/60 text-xs text-slate-200 max-w-sm pointer-events-auto shadow-lg flex items-center gap-2">
          <Radio className={`w-4 h-4 ${isAiSpeaking ? 'text-amber-400 animate-spin' : 'text-sky-400'}`} />
          <span className="font-medium truncate">
            {hoveredNode ? (
              <span className="text-sky-300 font-bold">Department: {hoveredNode} (Click to inquire)</span>
            ) : isAiSpeaking ? (
              <span className="text-amber-300 font-medium">AI Counselor is synthesizing response...</span>
            ) : (
              <span>Orbiting 10+ Engineering Departments • Interactive 3D</span>
            )}
          </span>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md p-1 rounded-xl border border-slate-700/60 pointer-events-auto shadow-lg text-xs">
          <button
            onClick={() => {
              setActiveViewMode('orbit');
              resetCamera();
            }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
              activeViewMode === 'orbit'
                ? 'bg-sky-600 text-white font-medium shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Orbit View
          </button>

          <button
            onClick={resetCamera}
            title="Reset Camera Orientation"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Subtle corner indicator */}
      <div className="absolute top-4 right-4 sm:hidden pointer-events-none">
        <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-1 rounded border border-amber-500/30">
          NAAC A++
        </span>
      </div>
    </div>
  );
};
