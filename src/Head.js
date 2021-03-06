/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF , MeshDistortMaterial} from '@react-three/drei'
import { Canvas,
  useLoader,
  useFrame,
  extend,
  useThree } from 'react-three-fiber'
import head from './head.glb'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF(head)


  useFrame(() => {
    group.current.rotation.y += 0.002
  })
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        material={materials['Material.001']}
        geometry={nodes.skull.geometry}
        position={[0, -4.6, 5.63]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[3.71, 3.71, 3.71]}
      >
        <MeshDistortMaterial
          envMap={null}
          reflectivity={1}
          metalness={1}

          refractionRatio={0.98}
          color={"lightgrey"}
          attach="material"
          distort={0} // Strength, 0 disables the effect (default=1)
          speed={1} // Speed (default=1)
          roughness={0}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload(head)
