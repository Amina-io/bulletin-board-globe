import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export default function LocationMarker({ position, location, onClick }) {
  const markerRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [scale, setScale] = useState(1);

  // Animated floating effect
  useFrame((state) => {
    if (markerRef.current) {
      const time = state.clock.getElapsedTime();
      markerRef.current.position.y = position.y + Math.sin(time * 2 + position.x) * 0.05;
      
      // Scale animation on hover
      const targetScale = hovered ? 1.3 : 1;
      setScale(prev => THREE.MathUtils.lerp(prev, targetScale, 0.1));
      markerRef.current.scale.setScalar(scale);
    }
  });

  // Calculate normal vector for proper orientation
  const normal = position.clone().normalize();

  return (
    <group>
      {/* Main marker pin */}
      <mesh
        ref={markerRef}
        position={[position.x, position.y, position.z]}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Pin body */}
        <cylinderGeometry args={[0.02, 0.02, 0.2]} />
        <meshStandardMaterial color={hovered ? '#ff6b6b' : '#ff4757'} />
      </mesh>

      {/* Pin head/top */}
      <mesh
        position={[
          position.x + normal.x * 0.15,
          position.y + normal.y * 0.15,
          position.z + normal.z * 0.15
        ]}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial 
          color={hovered ? '#ff6b6b' : '#ff4757'} 
          emissive={hovered ? '#ff2f2f' : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>

      {/* Hover label */}
      {hovered && (
        <Html
          position={[
            position.x + normal.x * 0.4,
            position.y + normal.y * 0.4,
            position.z + normal.z * 0.4
          ]}
          center
        >
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '14px',
              fontFamily: 'Arial, sans-serif',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
              transform: 'translate(-50%, -100%)',
              marginBottom: '10px'
            }}
          >
            <div style={{ fontWeight: 'bold' }}>{location.name}</div>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>
              {location.context} • {location.country}
            </div>
          </div>
        </Html>
      )}

      {/* Pulsing ring effect */}
      <mesh
        position={[position.x, position.y, position.z]}
        rotation={[
          Math.atan2(normal.y, Math.sqrt(normal.x * normal.x + normal.z * normal.z)),
          Math.atan2(normal.x, normal.z),
          0
        ]}
      >
        <ringGeometry args={[0.08, 0.12, 16]} />
        <meshBasicMaterial 
          color="#ff4757" 
          transparent 
          opacity={hovered ? 0.6 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}