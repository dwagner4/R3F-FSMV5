/* 
   Sphere has a SphereLogic JSON object which is used to create an Actor internal to the Sphere.
   the logic could be imported from another file.
*/

import { useRef } from 'react'
import { assign, createMachine } from 'xstate';
import { useActorRef } from '@xstate/react';

export const sphereLogic = {
    predictableActionArguments: true,
    id: 'csphereFSM',
    initial: 'half',
    context: {
        yPosition: 0
    },
    states: {
        half: { 
            on: {
                CLK: {
                    target: "small",
                    actions: [ assign( {yPosition: 1} ) ]
                }
            }
        },
        small: {
            on: {
                CLK: {target: "half", 
                    actions: [ assign( {yPosition: 0}) ]
                }
            }
        },
    }
} 

export const Sphere = ({position, scale }) => {

    const sphere = useRef()

    const sphereActor = useActorRef((createMachine(sphereLogic)));

    sphereActor.subscribe((snapshot) => {
        sphere.current.position.y = snapshot.context.yPosition
    })
    
    const clickhandler = () => {
        sphereActor.send({type: 'CLK'})
    }

    return (
        <mesh onClick={clickhandler} ref={sphere} position={position} scale={scale} >
          <meshStandardMaterial />
          <sphereGeometry radius={5} />
        </mesh>
    );
};
