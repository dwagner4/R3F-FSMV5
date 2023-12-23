import { createMachine, createActor, assign } from 'xstate';
import { cubeLogic } from './models/Cube.jsx'

// const cubeMachine1 = createMachine( cubeLogic )
// const cubeMachine2 = createMachine( cubeLogic )

export const appMachine = createMachine({
  "id": "appMachine",
  "context": {
    "message": "click a menu item to change me",
    "count": 0,
    "color": "black",
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
    },
    "MENU_ITEM": {  
      actions: [
        assign({
          message: ({ context, event }) => event.data.message,
          color: ({ context, event }) => event.data.color,
        }),
      ]
    },
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
