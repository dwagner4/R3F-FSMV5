import { createMachine, createActor, assign, setup } from 'xstate';
import { cubeLogic } from './models/Cube.jsx'

const appMachine = setup(
  {
    actions: {
      menuAction: assign({
        message: ({ context, event }) => event.data.message,
        color: ({ context, event }) => event.data.color,
      }),
      log: ({ context, event }) => console.log(context),
      makeAcubeArray: assign({
        elements: ({ context, event, spawn }) => {
          const newCube = spawn(createMachine(cubeLogic), { systemId: event.data.id });
          return context.elements.concat(newCube);
        },
      }),
      makeACubeObj: assign({
        elementObj: ({ context, event, spawn }) => {
          const newCube = spawn(createMachine(cubeLogic), { systemId: event.data.id})
          const newID = event.data.id
          const newObj = context.elementObj
          newObj[newID] = newCube
          return newObj
        },
      }),
    },
    actors: {},
    guards: {},
    delays: {},
  }
).createMachine({
  "id": "appMachine",
  "context": {
    "message": "click a menu item to change me",
    "count": 0,
    "color": "black",
    elements: [],
    elementObj: {}
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
        // "makeACubeObj", 
        "makeAcubeArray"   
      ]  
    },
    "MENU_ITEM": {  
      actions: [ "menuAction", "log"]
    },
  }
}
// 
)

export const AppActor = createActor(appMachine, {
  systemId: 'root-dean',
})

AppActor.start()