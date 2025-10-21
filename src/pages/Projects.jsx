// src/pages/Home.jsx
import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Layer, Connections } from '../components/NeuralNetwork'

const SCALE = 10
const CUBE_SIZE = SCALE * 0.5
const SPACING = SCALE * 2
const FRAME_DURATION = 800
const WORD = "HOFFMANN".split("")
const OUTPUT_LETTERS = ["H", "O", "F", "M", "A", "N"] // 6 neurones

const LETTERS = {
  H: [
    "1000000001", "1000000001", "1000000001", "1111111111", "1000000001",
    "1000000001", "1000000001", "1000000001", "1000000001", "1000000001"
  ],
  O: [
    "0011111100", "0110000110", "1100000011", "1000000001", "1000000001",
    "1000000001", "1100000011", "0110000110", "0011111100", "0000000000"
  ],
  F: [
    "1111111111", "1000000000", "1000000000", "1111111100", "1000000000",
    "1000000000", "1000000000", "1000000000", "1000000000", "1000000000"
  ],
  M: [
    "1000000001", "1100000011", "1010000101", "1001001001", "1000100011",
    "1000000001", "1000000001", "1000000001", "1000000001", "1000000001"
  ],
  A: [
    "0011111000", "0100000100", "1000000010", "1000000010", "1111111110",
    "1000000010", "1000000010", "1000000010", "1000000010", "1000000010"
  ],
  N: [
    "1000000001", "1100000001", "1010000001", "1001000001", "1000100001",
    "1000010001", "1000001001", "1000000101", "1000000011", "1000000001"
  ]
}

function bitmapToInput(letter) {
  const rows = LETTERS[letter]
  return rows.slice().reverse().map(row => row.split('').map(v => parseFloat(v)))
}

function generateWeights() {
  return Array(100).fill().map(() => Array(6).fill().map(() => Math.random()))
}

export default function Projects() {
  const [frame, setFrame] = useState(0)
  const [weights] = useState(generateWeights)

  const isMobile = window.innerWidth < 768

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % WORD.length)
    }, FRAME_DURATION)
    return () => clearInterval(interval)
  }, [])

  const currentLetter = WORD[frame]
  const letterBitmap = bitmapToInput(currentLetter)
  const highlightIndex = OUTPUT_LETTERS.findIndex(l => l === currentLetter)
  const outputLayer = [Array(6).fill(1)]



 
  return (
    <>
      <Canvas
        style={{ width: '100vw', height: '100vh' }}
        camera={{ position: [0, 500, isMobile ? 300 : 200], fov: 50 }}
      >
        <ambientLight intensity={1} />
        <OrbitControls enableZoom={false} enablePan={false} />

        {/* Grille d'entrée */}
        <Layer
          data={letterBitmap}
          position={[0, -SCALE * 10, 0]}
          spacing={SPACING}
          size={CUBE_SIZE}
        />

        {/* Sortie : 6 neurones */}
        <Layer
          data={outputLayer}
          position={[0, SCALE * 10, 0]}
          spacing={SPACING}
          size={CUBE_SIZE}
          highlightIndex={highlightIndex}
          isOutput={true}
        />

        {/* Connexions dynamiques */}
        <Connections
          from={letterBitmap}
          to={outputLayer}
          fromY={-SCALE * 10}
          toY={SCALE * 10}
          spacing={SPACING}
          weights={weights}
        />
      </Canvas>

      <div className="overlay">
        <span className="letter">{currentLetter}</span>
      </div>
    </>
  )
}

