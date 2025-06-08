import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { locations } from '../data/locations';
import LocationMarker from './LocationMarker';

// Convert lat/lng to 3D coordinates
function latLngToVector3(lat, lng, radius = 2.05) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
}

// Helper function to check WebGL support
function checkWebGLSupport() {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!context;
  } catch (e) {
    return false;
  }
}

// Loading component
function Loading() {
  return (
    <div className="loading">
      📌 Loading bulletin boards from around the world...
    </div>
  );
}

// Error fallback component
function ErrorFallback({ error }) {
  console.error('Globe Error Details:', error);
  const hasWebGL = checkWebGLSupport();
  
  return (
    <div className="loading">
      ⚠️ Geographic loading has failed. Please refresh the page!
      <br />
      <small style={{ fontSize: '12px', color: '#666', marginTop: '8px', display: 'block' }}>
        {error?.message || 'WebGL or texture loading error'}
        <br />
        WebGL Support: {hasWebGL ? '✓ Available' : '✗ Not Available'}
      </small>
    </div>
  );
}

// Earth and Markers combined component
function EarthWithMarkers({ onLocationClick }) {
  const groupRef = useRef();
  
  // Load earth texture with error handling
  const earthTexture = useLoader(
    TextureLoader, 
    'https://unpkg.com/three-globe/example/img/earth-day.jpg',
    undefined, // onProgress
    (error) => {
      console.error('Failed to load Earth texture:', error);
      throw new Error(`Texture loading failed: ${error.message}`);
    }
  );
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001; // Much slower rotation
    }
  });

  return (
    <group ref={groupRef}>
      {/* Earth Sphere */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={earthTexture} />
      </mesh>
      
      {/* Location Markers */}
      {locations.map((location) => {
        const position = latLngToVector3(
          location.coordinates.lat,
          location.coordinates.lng
        );
        
        return (
          <LocationMarker
            key={location.id}
            position={position}
            location={location}
            onClick={() => onLocationClick(location)}
          />
        );
      })}
    </group>
  );
}

// Error boundary for Canvas
class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Canvas Error:', error, errorInfo);
    console.error('Error Stack:', error.stack);
    console.error('Component Stack:', errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default function Globe({ onLocationClick }) {
  return (
    <CanvasErrorBoundary>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ width: '100%', height: '100vh', background: 'transparent' }}
        gl={{ 
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: false,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl, scene }) => {
          // Make background transparent
          gl.setClearColor(0x000000, 0);
          
          // Handle context loss
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            console.warn('WebGL context lost');
            e.preventDefault();
          });
          
          gl.domElement.addEventListener('webglcontextrestored', () => {
            console.log('WebGL context restored');
          });
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Suspense fallback={<Loading />}>
          <EarthWithMarkers onLocationClick={onLocationClick} />
        </Suspense>
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
          minDistance={3}
          maxDistance={8}
        />
      </Canvas>
    </CanvasErrorBoundary>
  );
}