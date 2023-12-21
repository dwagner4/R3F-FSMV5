import { createMachine, createActor, assign } from 'xstate';
import { cubeLogic } from './models/Cube.jsx'

// const cubeMachine1 = createMachine( cubeLogic )
// const cubeMachine2 = createMachine( cubeLogic )

export const appMachine = createMachine({
  "id": "appMachine",
  "context": {
    "message": "no message",
    "count": 0,
    "color": "#ff8800",
    elements: []
  },
  "initial": "home",
  "states": {
    "home": {
      "on": {
        "menu.loading": {
          "target": "loading"
        }
      }
    },
    "loading": {
      
    }
  },
  "on": {
    "makeACube": {
      actions: [
        assign({
          elements: ({ context, event, spawn }) => {
            const newCube = spawn(createMachine(cubeLogic), {
              systemId: event.data.id,
            });

            return context.elements.concat(newCube);
            },
        })    
      ]  
    }
  }
}, {
      actions: {"getActorData": ({ context, event }) => {},
                "toggleColor": assign({
                  color: ( context, event ) => context.color = context.color == "blue" ? 'red' : "blue"
                }),
              },
      actors: {},
      guards: {},
      delays: {},
    })
