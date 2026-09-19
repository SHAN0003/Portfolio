import React, { useRef } from 'react';
import { Canvas, useFrame, extend, ReactThreeFiber, useThree } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --------------------------------------------------------
// CUSTOM SHADER MATERIAL
// Uses Domain Warping for a "crazy" liquid oil effect
// --------------------------------------------------------
const FluidMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(1, 1),
    uColor1: new THREE.Color('#000000'), // Deep Black
    uColor2: new THREE.Color('#4c1d95'), // Deep Violet
    uColor3: new THREE.Color('#06b6d4'), // Bright Cyan
    uColor4: new THREE.Color('#db2777'), // Hot Pink
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec3 uColor4;
    varying vec2 vUv;

    // --- Noise Functions ---
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    // --- Fractal Brownian Motion ---
    float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        // Fewer octaves for performance, but good enough for liquid
        for (int i = 0; i < 3; i++) {
            value += amplitude * snoise(st);
            st *= 2.0;
            amplitude *= 0.5;
        }
        return value;
    }

    // --- Domain Warping ---
    // This feeds noise into noise to create that "oil slick" look
    float domainWarp(vec2 p) {
        vec2 q = vec2(fbm(p), fbm(p + vec2(5.2, 1.3)));
        vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.7, 9.2)), fbm(p + 4.0 * q + vec2(8.3, 2.8)));
        return fbm(p + 4.0 * r);
    }

    void main() {
        vec2 uv = vUv;
        
        // Correct aspect ratio
        float aspect = uResolution.x / uResolution.y;
        vec2 uvCorrected = uv;
        uvCorrected.x *= aspect;

        vec2 mouse = uMouse;
        mouse.x *= aspect;

        // Interaction
        float dist = distance(uvCorrected, mouse);
        float interaction = smoothstep(0.6, 0.0, dist);

        // Base flow
        vec2 warpParams = uvCorrected * 2.0 + vec2(uTime * 0.15);
        
        // "Drag" the fluid with the mouse
        warpParams += (uvCorrected - mouse) * interaction * 1.5;

        // Generate the liquid pattern
        float pattern = domainWarp(warpParams);

        // Color Mixing Logic
        vec3 color = uColor1; // Base Black
        
        // Add Violet layers
        color = mix(color, uColor2, smoothstep(0.1, 0.9, pattern));
        
        // Add Cyan highlights where noise is high or near mouse
        color = mix(color, uColor3, smoothstep(0.6, 1.0, pattern) * 0.8);
        
        // Add Pink bursts for extra energy
        float pinkMix = smoothstep(0.7, 1.0, pattern + interaction * 0.5);
        color = mix(color, uColor4, pinkMix);

        // Mouse glow
        color += uColor3 * interaction * 0.2;

        gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ FluidMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      fluidMaterial: ReactThreeFiber.Object3DNode<THREE.ShaderMaterial, typeof FluidMaterial>;
    }
  }
}

// --------------------------------------------------------
// FLUID PLANE COMPONENT
// --------------------------------------------------------
const FluidPlane = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size } = useThree();

  useFrame((state) => {
    if (materialRef.current) {
      // Time for animation
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Update Resolution uniform for aspect ratio correction
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);

      // Mouse Logic (Normalize to 0..1)
      const targetX = (state.mouse.x + 1) / 2;
      const targetY = (state.mouse.y + 1) / 2;
      
      // Lerp for smooth trailing effect
      materialRef.current.uniforms.uMouse.value.lerp(
        new THREE.Vector2(targetX, targetY),
        0.08
      );
    }
  });

  return (
    // Scale mesh to viewport to ensure it always fills the screen exactly
    // @ts-ignore
    <mesh scale={[viewport.width, viewport.height, 1]}>
      {/* @ts-ignore */}
      <planeGeometry args={[1, 1]} /> 
      {/* @ts-ignore */}
      <fluidMaterial
        ref={materialRef}
        key={FluidMaterial.key}
        transparent={true}
      />
    {/* @ts-ignore */}
    </mesh>
  );
};

// --------------------------------------------------------
// MAIN EXPORT
// --------------------------------------------------------
export const FluidDistortion: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-100">
      <Canvas 
        dpr={[1, 2]} // Handle high DPI screens
        camera={{ position: [0, 0, 1] }} // Default perspective is fine if we scale mesh to viewport
        // Alternatively, we could use OrthographicCamera for pixel-perfect flat rendering, 
        // but scaling the mesh to viewport in R3F works perfectly for this background.
      >
        <FluidPlane />
      </Canvas>
    </div>
  );
};