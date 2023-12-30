import { createMachine, createActor, assign } from 'xstate';
import { cubeLogic } from './models/Cube.jsx'

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
      actions: [ "menuAction"
        // assign({
        //   message: ({ context, event }) => event.data.message,
        //   color: ({ context, event }) => event.data.color,
        // }),
      ]
    },
  }
}, {
      actions: {
        menuAction: assign({
          message: ({ context, event }) => event.data.message,
          color: ({ context, event }) => event.data.color,
        }),
      },
      actors: {},
      guards: {},
      delays: {},
    })
