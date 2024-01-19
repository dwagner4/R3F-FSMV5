/* Top of the application. imports all the elements that compose the app.
  Assigns the systemId to appMachine creating the AppActor and starting it.
  The running AppActor is exported and can be used in all components.
  An alternative would be to use createActorContext()  but I had trouble 
  using the factory method to create children FSMs in an Array and calling them 
  from the root system
*/

import './App.css';
import { Canvas } from "@react-three/fiber";
import { Experience } from "./exp/Experience";
import { Menu } from './components/menu/Menu.jsx'
import { Nda } from './components/nda/Nda.jsx'

import * as React from 'react';

function App() {
  
  return (
    <>
      <Canvas shadows camera={{ position: [6, 6, 6], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
      <Menu />
      <Nda />
    </>
  );
}

export default App;