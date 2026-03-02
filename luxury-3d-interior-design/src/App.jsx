import React, { useState } from 'react'
import Scene3D from './components/Scene3D'
import UIOverlay from './components/UIOverlay'
import './App.css'

export default function App() {
  const [selectedSection, setSelectedSection] = useState(null)

  return (
    <div className="app-container">
      <Scene3D onSectionClick={setSelectedSection} />
      {selectedSection && (
        <UIOverlay section={selectedSection} onClose={() => setSelectedSection(null)} />
      )}
    </div>
  )
}