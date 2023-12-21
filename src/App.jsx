import './App.css';
import { Canvas } from "@react-three/fiber";
import { Experience } from "./exp/Experience";
// import { HeadsUp } from "./components/headsup/HeadsUp.jsx"
// import { Menu } from './components/menu/Menu.jsx'

import * as React from 'react';
import { appMachine } from './appMachine.js'
// import { createActorContext } from '@xstate/react'
import { createActor } from 'xstate';

export const AppActor = createActor(appMachine, {
  systemId: 'root-dean',
})

AppActor.start()

function App() {
  
  return (
      <Canvas shadows camera={{ position: [6, 6, 6], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
  );
}

export default App;