import {useEffect, useRef, useState} from 'react'
import { assign, createMachine, createActor } from 'xstate';
import { useActor } from '@xstate/react';

export const Sphere = ({position, scale }) => {

    const sphere = useRef()

    const [ state, send, actorRef ] = useActor((createMachine(sphereLogic)));

    useEffect(() => {
        sphere.current.position.y = state.context.yPosition
        console.log(state.context.yPosition)
    }   , [state.context.yPosition])

    
    const clickhandler = () => {
        send({type: 'CLK'})
    }

    return (
        <mesh onClick={clickhandler} ref={sphere} position={position} scale={scale} >
          <meshStandardMaterial />
          <sphereGeometry radius={5} />
        </mesh>
    );
};

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
                    actions: [ (context, event) => console.log( context, event ), assign( {yPosition: 1} ) ]
                }
            }
        },
        small: {
            on: {
                CLK: {target: "half", 
                    actions: [ (context, event) => console.log( context, event ), assign( {yPosition: 0}) ]
                }
            }
        },
    }
}