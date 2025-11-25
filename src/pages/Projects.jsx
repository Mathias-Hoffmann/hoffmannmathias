// src/pages/Projects.jsx
import React, { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
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

// 🎬 Petit composant pour animer le group
function AnimatedNetwork({ letterBitmap, outputLayer, highlightIndex, weights }) {
  const groupRef = useRef()

  useFrame((state, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.1
    groupRef.current.rotation.x += delta * 0.05
  })

  return (
    <group ref={groupRef} scale={0.7}>
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
    </group>
  )
}

export default function Projects() {
  const [frame, setFrame] = useState(0)
  const [weights] = useState(generateWeights)

  const isMobile =
    typeof window !== 'undefined' ? window.innerWidth < 768 : false

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
    <div className="projects-page">
      {/* === PROJET 1 : Réseau de neurones HOFFMANN === */}
      <div className="project-row">
        {/* Colonne 1 : texte explicatif */}
        <div className="info-panel">
          <h1>Custom neural network</h1>
<div className="info-panel">

  <p>
    A minimalist and interactive 3D visualization of a tiny neural network trained to 
    recognize the letters of my name: <strong>HOFFMANN</strong>.
  </p>

  <p>
    The 10×10 input grid shows the active pixels of the current letter,
    while the upper layer displays 6 output neurons — one for each 
    possible character (H, O, F, M, A, N).
  </p>

  <p>
    The network cycles through all letters and highlights the neuron 
    activated at each step.
  </p>

  <h3>Tools used</h3>
  <ul>
    <li>React & React Three Fiber</li>
    <li>Three.js for 3D rendering</li>
    <li>Custom bitmap dataset (10×10 letters)</li>
    <li>Animated weight connections</li>
  </ul>

  <h3>Inspired by</h3>
  <ul>
    <li>3Blue1Brown — <em>Neural Networks</em> series</li>
    <li>3Blue1Brown — <em>What is a neural network?</em></li>
  </ul>
</div>

        </div>

        {/* Colonne 2 : objet 3D */}
        <div className="canvas-panel">
          <Canvas
            style={{ width: '100%', height: '200%' }}
            camera={{ position: [0, 500, isMobile ? 350 : 260], fov: 23 }}
          >
            <ambientLight intensity={1} />
            <OrbitControls enableZoom={false} enablePan={false} />

            <AnimatedNetwork
              letterBitmap={letterBitmap}
              outputLayer={outputLayer}
              highlightIndex={highlightIndex}
              weights={weights}
            />
          </Canvas>
        </div>
      </div>

      {/* Tu pourras rajouter d'autres projets ici en recopiant project-row */}
    </div>
  )
}
