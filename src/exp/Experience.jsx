import { OrbitControls } from "@react-three/drei";
import { Cube } from '../models/Cube.jsx'
import { Sphere } from '../models/Sphere.jsx'

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <Cube position={[ -1, 0, 1]} tag="Joe" fsm="shapeRef1" friend="shapeRef2"/>
      <Cube position={[ 1, 0, -1]} tag ="fart" fsm="shapeRef2" friend="shapeRef1"/>
      <Sphere position={[ 1, 0, 1]} scale={0.5}/>
      <directionalLight color="red" position={[0, 5, 5]} intensity={2} />
      <ambientLight color="blue" intensity={0.5} />
    </>
  );
};