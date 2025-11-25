import React, { useRef, useEffect, useState } from 'react'

const PHRASE = 'mathias.hoffmann@imt-atlantique.net'.split('')
const CANVAS_WIDTH = 500
const CANVAS_HEIGHT = 180
const GROUND_Y = 140


export default function Contact() {
  const canvasRef = useRef(null)
  const [shouldRestart, setShouldRestart] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const scale = window.devicePixelRatio || 1
    canvas.width = CANVAS_WIDTH * scale
    canvas.height = CANVAS_HEIGHT * scale
    canvas.style.width = `${CANVAS_WIDTH}px`
    canvas.style.height = `${CANVAS_HEIGHT}px`
    canvas.style.border = "4px solid #000";
    canvas.style.borderRadius = "12px";
    canvas.style.boxShadow = "8px 8px 0 #000"; // ombre derrière le canvas
    canvas.style.imageRendering = "pixelated";
    ctx.scale(scale, scale)

    let brain = { x: 50, y: GROUND_Y, width: 20, height: 20, vy: 0, jumping: false }
    let obstacles = []
    let score = 0
    let frame = 0
    let gameOver = false
    let currentLetterIndex = 0

    function spawnObstacle() {
      const letter = PHRASE[currentLetterIndex % PHRASE.length]
      obstacles.push({
        x: CANVAS_WIDTH,
        y: GROUND_Y,
        width: 20,
        height: 20,
        letter
      })
      currentLetterIndex++
    }

    function drawBrain() {
      ctx.font = '28px serif'
      ctx.fillText('🧠', brain.x, brain.y)
    }

    function drawObstacles() {
      ctx.fillStyle = 'black'
      ctx.font = '14px "Press Start 2P", monospace'
      obstacles.forEach(o => {
        ctx.fillText(o.letter, o.x, o.y)
      })
    }

    function update() {
      if (gameOver) return

      frame++
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      // Sol
      ctx.fillStyle = '#aaa'
      ctx.fillRect(0, GROUND_Y + 5, CANVAS_WIDTH, 5)

      // Gravity / saut
      brain.y += brain.vy
      brain.vy += 1.2
      if (brain.y >= GROUND_Y) {
        brain.y = GROUND_Y
        brain.vy = 0
        brain.jumping = false
      }


      // Spawn lettres
      if (frame % 90 === 0) spawnObstacle()

      // Move lettres
      obstacles.forEach(o => o.x -= 3)
      obstacles = obstacles.filter(o => o.x + o.width > 0)

      // Collision
      obstacles.forEach(o => {
        if (
          o.x < brain.x + brain.width &&
          o.x + o.width > brain.x &&
          brain.y >= o.y - o.height
        ) {
          gameOver = true
          setIsGameOver(true)
        }
      })

      drawBrain()
      drawObstacles()

      // Score
      score++
      ctx.fillStyle = 'black'
      ctx.font = '12px monospace'
      ctx.fillText(`Score: ${score}`, 10, 20)

      if (gameOver) {
        ctx.fillStyle = 'rgba(255, 107, 181, 1)'
        ctx.font = '14px "Press Start 2P", monospace'

        ctx.fillText('GAME OVER', CANVAS_WIDTH / 2 - 60, GROUND_Y - 40)
      } else {
        requestAnimationFrame(update)
      }
    }

    function jump() {
      if (!brain.jumping) {
        brain.vy = -18
        brain.jumping = true
      }
    }

    const handleKeydown = (e) => {
      if (e.code === 'Space') jump()
    }

    document.addEventListener('keydown', handleKeydown)
    update()

    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [shouldRestart])

  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      
      <p style={{ fontSize: '1rem' }}>You can contact me by mail :</p>

      <h2 style={{ marginTop: '0.5rem', fontSize: '1.1rem' }}>
        mathias.hoffmann@imt-atlantique.net
      </h2>

      <canvas
        ref={canvasRef}
        style={{
          border: '2px solid black',
          marginTop: '5rem',
          background: 'white',
          display: 'block',
          marginInline: 'auto',
        }}
      />

      {isGameOver && (
        <button
          onClick={() => {
            setShouldRestart(prev => !prev)
            setIsGameOver(false)
          }}
          style={{
            marginTop: '1rem',
            padding: '0.6rem 1.2rem',
            fontSize: '1rem',
            fontFamily: '"Press Start 2P", monospace',
            backgroundColor: '#ff69b4',
            border: 'none',
            borderRadius: '6px',
            color: 'white',
            cursor: 'pointer'
            
          }}
        >
          Restart
        </button>
      )}
      
      <p style={{ marginTop: '0.5rem' }}>
        Press the <b>space bar</b> to jump!
      </p>
    </main>
  )
}































































