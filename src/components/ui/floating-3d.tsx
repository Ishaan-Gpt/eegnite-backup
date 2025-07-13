import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text3D } from '@react-three/drei'
import { useRef, useState } from 'react'
import { Mesh } from 'three'
import { useSpring, animated } from '@react-spring/three'

function FloatingShape({ position, color = '#6366f1' }: { position: [number, number, number], color?: string }) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  const { scale } = useSpring({
    scale: hovered ? 1.2 : 1,
    config: { tension: 300, friction: 30 }
  })

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <animated.mesh
        ref={meshRef}
        position={position}
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.7}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </animated.mesh>
    </Float>
  )
}

export function Floating3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <FloatingShape position={[-2, 1, 0]} color="#6366f1" />
        <FloatingShape position={[2, -1, -1]} color="#8b5cf6" />
        <FloatingShape position={[0, 2, -2]} color="#06b6d4" />
        <FloatingShape position={[-1, -2, 1]} color="#10b981" />
      </Canvas>
    </div>
  )
}