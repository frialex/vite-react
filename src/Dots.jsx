import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber';

export default function Dots(){
  const ref = useRef();
  const {vec, transform, positions, distances} = useMemo(() => {
    const vec = new THREE.Vector3();
    const transform = new THREE.Matrix4

    const positions = [...Array(10000)].map((_,i) => {
      const position = new THREE.Vector3();
      position.x = (i % 100) - 50
      position.y = Math.floor(i / 100) - 5
      return position;
    })

    const right = new THREE.Vector3(1, 0, 0);
    const distances = positions.map((pos) => {
      return pos.length() //+ Math.cos(pos.angleTo(right)) 
    })

    return { vec, transform, positions, distances }
  }, [])

  useFrame( (state) => {
    let {clock} = state;

    for (let i = 0; i < 10000; ++i){
      const dist = distances[i]

      const t = clock.elapsedTime - dist / 25;

      const wave = Math.sin(t);
      vec.copy(positions[i]).multiplyScalar(wave + 1.3);
      transform.setPosition(vec);
      ref.current.setMatrixAt(i, transform);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  })

  return (
    <instancedMesh ref={ref} args={[null, null, 1000]}>
      <circleGeometry args={[0.15]} />
      <meshBasicMaterial />
    </instancedMesh>
  )
}