import React, { useRef } from 'react'
import { Html } from '@react-three/drei'
import { useSpring, animated as a } from '@react-spring/three'

const AnimatedMesh = a.mesh

const COLOR = {
  gold: '#e7c873',
  white: '#fff8f0',
}

export default function UIPanel({
  position,
  label,
  sectionId,
  onClick,
  isHovered,
  onHover,
  onUnhover,
}) {
  const meshRef = useRef()

  const { scale, emissiveIntensity } = useSpring({
    scale: isHovered ? 1.15 : 1,
    emissiveIntensity: isHovered ? 0.8 : 0.2,
    config: { tension: 200, friction: 20 },
  })

  return (
    <AnimatedMesh
      ref={meshRef}
      position={position}
      scale={scale}
      onClick={onClick}
      onPointerEnter={onHover}
      onPointerLeave={onUnhover}
      castShadow
    >
      <boxGeometry args={[1.8, 1, 0.1]} />
      <meshStandardMaterial
        color={COLOR.white}
        emissive={COLOR.gold}
        emissiveIntensity={emissiveIntensity}
        metalness={0.5}
        roughness={0.2}
        transparent
        opacity={0.85}
      />
      
      <Html scale={0.008} position={[0, 0, 0.1]}>
        <div
          style={{
            width: 220,
            padding: '20px',
            textAlign: 'center',
            borderRadius: '16px',
            border: `2px solid ${COLOR.gold}`,
            background: 'rgba(255, 248, 240, 0.7)',
            backdropFilter: 'blur(12px)',
            boxShadow: `0 8px 32px rgba(231, 200, 115, 0.15)`,
            color: '#333',
            fontWeight: '600',
            fontSize: '18px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          {label}
        </div>
      </Html>
    </AnimatedMesh>
  )
}