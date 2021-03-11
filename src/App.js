import React, { useRef, useState , Suspense} from 'react'
import { Canvas,
  useLoader,
  useFrame,
  extend,
  useThree } from 'react-three-fiber'
import { Environment, softShadows, MeshDistortMaterial, ContactShadows , useCubeTexture  } from '@react-three/drei'
import Skull from './Head'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import grid from './sky.png'
import left from './SkyBox_Left.png'
import right from './SkyBox_Right.png'
import up from './SkyBox_Up.png'
import down from './SkyBox_Down.png'
import back from './SkyBox_Back.png'
import front from './SkyBox_Front.png'


softShadows();
extend({ OrbitControls });

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement },
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      enableZoom={true}
      args={[camera, domElement]}
    />
  );
};


function Sphere() {
  return (
    <mesh visible userData={{ test: "hello" }} position={[0, 0, 0]} castShadow>
      <sphereGeometry attach="geometry" args={[1, 32, 32]} />
     <MeshDistortMaterial
     envMap={null}
     reflectivity={0.9}
     metalness={1}
     
     refractionRatio={0.98}
     color={"#CCFFFD"}
    attach="material"
    distort={0} // Strength, 0 disables the effect (default=1)
    speed={1} // Speed (default=1)
    roughness={0}
  />
     
    </mesh>
  );
}


function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })
  return (
    <mesh
      {...props}
      receiveShadow castShadow
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function App() {
  const x = new Array(30);
  const tex = useCubeTexture([left,right,up,down,front,back],{ path: './' });
  return (
    <Canvas  shadowMap>
        <CameraControls />
      <fog attach="fog" args={["white", 0, 40]} />
      <directionalLight
      castShadow
      position={[2.5, 8, 5]}
      intensity={1.5}
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-camera-far={50}
      shadow-camera-left={-10}
      shadow-camera-right={10}
      shadow-camera-top={10}
      shadow-camera-bottom={-10}
    />
    <ContactShadows
  opacity={1}
  width={1}
  height={1}
  blur={1} // Amount of blue (default=1)
  far={10} // Focal distance (default=10)
  resolution={256} // Rendertarget resolution (default=256)
/>
     
      <Suspense fallback={null} >
        <Environment files={[left,right,up,down,front,back]} path={'./'}  background={false} >
          
          </Environment>
          <Skull scale={[0.1,0.1,0.1]} envMap={tex} position={[0,0,0]}/>
      
      </Suspense>
     
      <mesh visible={false} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <shadowMaterial attach="material" transparent opacity={1} />
      </mesh>
    </Canvas>
  )
}
// <shadowMaterial attach="material" transparent opacity={1} />