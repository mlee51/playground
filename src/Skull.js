/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import skull from './skull.glb'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF(skull)
  console.log("hi");
  materials['Default OBJ'].color.set("blue");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={[0, 0, 0]}>
        <mesh material={materials['Default OBJ']} geometry={nodes['SubTool-0-7233285_1'].geometry} />
        <mesh material={materials['Default OBJ.001']} geometry={nodes['SubTool-0-7233285_2'].geometry} />
      </group>
    </group>
  )
}

useGLTF.preload(skull)
