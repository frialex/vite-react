import { useEffect, useMemo, useRef, useState } from 'react'
// import reactLogo from './assets/react.svg?raw'
// import viteLogo from '/vite.svg'
import './App.css'
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three'

import Dots from './Dots';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

THREE.ColorManagement.enabled = true;
THREE.ColorManagement.legacyMode = false;

function CameraController(){
  const { camera, gl } = useThree();
  useEffect(()=> {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.minDistance = 3;
    controls.maxDistance = 20;
    return controls.dispose;
  } , [camera, gl])

  return null;
}


function App() {

  return (
    <>
      <Canvas camera={{zoom: 0.5}} style={{width: '100vw', height: '100vh'}}>
        <CameraController />
        <ambientLight intensity={Math.PI / 2} />
        {/* <Box position={[1.2, 0, 0]} /> */}
        <Dots />
      </Canvas>
    </>
  )
}







export default App
