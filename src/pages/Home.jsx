//home page
import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import BrainModel from '../components/BrainModel'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [selectedPart, setSelectedPart] = useState('Brain_Part_06')
  const [cardPosition, setCardPosition] = useState({ x: 900, y: 80 })
  const [selectedRoute, setSelectedRoute] = useState(null)
  const navigate = useNavigate()

  const cardData = {
    Brain_Part_06: {
      title: 'Home',
      description: 'Select a other part to navigate.',
      route: '/home',
    },
    Brain_Part_05: {
      title: 'Contact',
      description: 'Want to chat? Contact me here.',
      route: '/contact',
    },
    Brain_Part_02: {
      title: 'About',
      description: 'About me and my work.',
      route: '/about',
    },
    Brain_Part_04: {
      title: 'Projects',
      description: 'Here Some projects I made.',
      route: '/',
    },
  }

  const currentCard = cardData[selectedPart]

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Texte fixe à gauche */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '5%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          maxWidth: '350px',
        }}
      >
        <h1 style={{ fontSize: '50px', fontWeight: '900', lineHeight: '1' }}>
          Select
        </h1>
        <h1 style={{ fontSize: '50px', fontWeight: '900', lineHeight: '1' }}>
          a other part
        </h1>
        <h1 style={{ fontSize: '50px', fontWeight: '900', lineHeight: '1' }}>
          to navigate
        </h1>

      </div>

      {/* Zone Canvas */}
      <div className="canvas-wrapper">
        <Canvas camera={{ position: [2.45, -0.15, 1.6], fov: 45 }}>
          <ambientLight intensity={0.1} />
          <directionalLight position={[0, 0, 5]} />
          <BrainModel
            selectedPart={selectedPart}
            setSelectedPart={setSelectedPart}
            setCardPosition={setCardPosition}
            setSelectedRoute={setSelectedRoute}
          />
          <OrbitControls />
        </Canvas>

        {/* Carte dynamique sur clic/survol */}
        {currentCard && (
          <div
            style={{
              position: 'absolute',
              top: cardPosition.y,
              left: cardPosition.x,
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '12px',
              padding: '12px 16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 1000,
              maxWidth: '240px',
              pointerEvents: 'auto',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <h4
              onClick={() => navigate(currentCard.route)}
              style={{
                margin: 0,
                marginBottom: '6px',
                color: '#333',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              {currentCard.title}
            </h4>
            <p style={{ margin: 0, fontSize: '0.9em', color: '#555' }}>
              {currentCard.description}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
