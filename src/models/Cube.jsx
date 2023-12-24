/* Upon initiation, the cube sends a "makeACube" event to AppActor which triggers a cube Actor factory method
   It fetches a ref to the FSM created and subscribes to changes in "cubespin"
   cubespin is stored locally in a variable called cuberotation.  
   I assume this is faster than fetching a snapshot on each frame.
   maybe useState would be better
*/

import {useRef} from 'react'
import { AppActor } from '../App.jsx'
import { assign } from 'xstate';
import { useFrame } from '@react-three/fiber';

export const Cube = ({position, tag, fsm, friend}) => {

    AppActor.send({type: 'makeACube', data: { id: fsm } })

    let cuberotation = 0

    const fsmRef = AppActor.system.get(fsm)
    console.log(fsmRef)
    fsmRef.subscribe((snapshot) => {
        cuberotation = snapshot.context.cubespin
    })

    const cube = useRef()   

    useFrame((state, delta) => {
        cube.current.rotation.y += delta * cuberotation
    })
    
    const clickhandler = () => {
        const friendRef = AppActor.system.get(friend)
        friendRef.send({type: 'CLK'})
    }

    return (
        <mesh onClick={clickhandler} ref={cube} position={position}>
          <meshNormalMaterial />
          <boxGeometry />
        </mesh>
    );
};

export const cubeLogic = {
    predictableActionArguments: true,
    id: 'cubeFSM',
    initial: 'idle',
    context: {
        cubespin: 0,
    },
    states: {
        idle: { 
            on: {
                CLK: {
                    target: "slow",
                    actions: [ (context, event) => console.log( context, event ), assign( {cubespin: 1} ) ]
                }
            }
        },
        slow: {
            on: {
                CLK: {target: "fast", 
                    actions: [ (context, event) => console.log( context, event ), assign( {cubespin: 2}) ]
                }
            }
        },
        fast:{
            on: {
                CLK: {target: "idle", 
                    actions: [ (context, event) => console.log( context, event ), assign( {cubespin: 0}) ]
                }
            }
        },
    }
}