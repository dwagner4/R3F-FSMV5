import { OrbitControls } from "@react-three/drei";
import { Cube } from '../models/Cube.jsx'

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <Cube position={[ -1, 0, 1]} tag="Joe" fsm="shapeRef1" friend="shapeRef2"/>
      <Cube position={[ 1, 0, -1]} tag ="fart" fsm="shapeRef2" friend="shapeRef1"/>
    </>
  );
};