import React, { useRef, useState } from 'react';
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

// Earth and Markers combined component
function EarthWithMarkers({ onLocationClick }) {
  const groupRef = useRef();
  
  // Load earth texture
  const earthTexture = useLoader(TextureLoader, 'https://unpkg.com/three-globe/example/img/earth-day.jpg');
  
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

export default function Globe({ onLocationClick }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ width: '100%', height: '100vh' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <EarthWithMarkers onLocationClick={onLocationClick} />
      
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
  );
}