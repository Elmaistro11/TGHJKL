import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import { useSpring, animated as a } from '@react-spring/three'
import Building from './Building'
import UIPanel from './UIPanel'
import Lighting from './Lighting'
import '../styles/Scene3D.css'

const AnimatedGroup = a.group

export default function Scene3D({ onSectionClick }) {
  const [hoveredSection, setHoveredSection] = useState(null)
  const controlsRef = useRef()

  const panelPositions = {
    reception: { pos: [3, 2.5, -2], label: 'Reception' },
    master: { pos: [-3, 2.5, -2], label: 'Master Bedroom' },
    kids: { pos: [0, 2.5, -3], label: 'Kids Rooms' },
    'bathroom-small': { pos: [3, 1, -2], label: 'Bathrooms' },
    kitchen: { pos: [-3, 1, -2], label: 'Kitchens' },
  }

  return (
    <div className="scene-container">
      <Canvas camera={{ position: [0, 5, 8], fov: 35 }} shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 5, 8]} />
          
          {/* Lighting */}
          <Lighting />
          
          {/* Environment */}
          <Environment preset="city" background blur={0.4} />
          
          {/* Main Building */}
          <Building onSectionClick={onSectionClick} />
          
          {/* Floating UI Panels */}
          {Object.entries(panelPositions).map(([key, { pos, label }]) => (
            <UIPanel
              key={key}
              position={pos}
              label={label}
              sectionId={key}
              onClick={() => onSectionClick(key)}
              isHovered={hoveredSection === key}
              onHover={() => setHoveredSection(key)}
              onUnhover={() => setHoveredSection(null)}
            />
          ))}
          
          {/* Controls */}
          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.12}
            autoRotate
            autoRotateSpeed={2}
            minDistance={5}
            maxDistance={15}
            target={[0, 1.5, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}