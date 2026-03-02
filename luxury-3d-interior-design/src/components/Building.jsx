import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COLOR = {
  gold: '#e7c873',
  white: '#fff8f0',
  beige: '#f7ede2',
  orange: '#ffd6a3',
  darkBeige: '#e8dcc4',
}

export default function Building({ onSectionClick }) {
  const buildingRef = useRef()
  const interactiveZones = useRef([])

  useFrame(() => {
    if (buildingRef.current) {
      buildingRef.current.rotation.y += 0.0002
    }
  })

  const createInteractiveZone = (name, position, scale) => {
    return (
      <mesh
        key={name}
        position={position}
        scale={scale}
        onClick={() => onSectionClick(name)}
        onPointerOver={(e) => {
          e.object.material.emissiveIntensity = 0.5
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.object.material.emissiveIntensity = 0.1
          document.body.style.cursor = 'default'
        }}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1.2, 1]} />
        <meshStandardMaterial
          color={COLOR.white}
          emissive={COLOR.gold}
          emissiveIntensity={0.1}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
    )
  }

  return (
    <group ref={buildingRef}>
      {/* Main Building Structure */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[6, 5, 4]} />
        <meshStandardMaterial
          color={COLOR.beige}
          metalness={0.2}
          roughness={0.5}
        />
      </mesh>

      {/* Gold Accent Line - Front */}
      <mesh position={[0, 2.6, 2.1]} castShadow>
        <boxGeometry args={[6, 0.15, 0.1]} />
        <meshStandardMaterial
          color={COLOR.gold}
          emissive={COLOR.gold}
          emissiveIntensity={0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Gold Accent Line - Center */}
      <mesh position={[0, 0, 2.1]} castShadow>
        <boxGeometry args={[6, 0.12, 0.1]} />
        <meshStandardMaterial
          color={COLOR.gold}
          emissive={COLOR.gold}
          emissiveIntensity={0.7}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Decorative Columns */}
      {[-2.5, 0, 2.5].map((x) => (
        <mesh key={`column-${x}`} position={[x, 0, 2]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 5, 8]} />
          <meshStandardMaterial
            color={COLOR.white}
            metalness={0.2}
            roughness={0.6}
          />
        </mesh>
      ))}

      {/* Interactive Zone - Reception */}
      {createInteractiveZone('reception', [-2, 1, 1.5], [1, 1.2, 0.8])}

      {/* Interactive Zone - Master Bedroom */}
      {createInteractiveZone('master', [0, 1, 1.5], [1.2, 1.2, 0.8])}

      {/* Interactive Zone - Kids Rooms */}
      {createInteractiveZone('kids', [2, 1, 1.5], [1, 1.2, 0.8])}

      {/* Interactive Zone - Bathrooms */}
      {createInteractiveZone('bathroom-small', [-2, -1, 1.5], [0.8, 1, 0.8])}

      {/* Interactive Zone - Kitchen */}
      {createInteractiveZone('kitchen', [2, -1, 1.5], [0.8, 1, 0.8])}

      {/* Floating Platform - Center */}
      <mesh position={[0, -2.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[7, 0.3, 5]} />
        <meshStandardMaterial
          color={COLOR.darkBeige}
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>

      {/* Soft Curves - Left Side */}
      <mesh position={[-3.2, 1.5, 0]} castShadow>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial
          color={COLOR.orange}
          emissive={COLOR.gold}
          emissiveIntensity={0.3}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>

      {/* Soft Curves - Right Side */}
      <mesh position={[3.2, 1.5, 0]} castShadow>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial
          color={COLOR.orange}
          emissive={COLOR.gold}
          emissiveIntensity={0.3}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
    </group>
  )
}