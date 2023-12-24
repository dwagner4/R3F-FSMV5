# R3F-FSMV5

This demo project uses React-Three-Fiber for 3D and Xstate V5 for all logic.  React components only display UI and generate events.  There are 4 Finite State Machines (FSM) used as Actors.  

There is a "Root" actor from appMachine.js which is meant to control the application.  The menu component sends messages to set data in the context.  At the same time the "NDA" component has subscribed to the root.context and reflects the state in its display.  Both components are outside the 3D environment.

The sphere has its own FSM providing internal logic.  If you click on the shpere it changes its height.

When the two Cubes are instantiated they send an event to the appMachine which creates child actors using a factory method.  The systemId of the Cube and its "friend" are passed in as attributes to the Cube Component.  If you click on either Cube it sends an event to its friend's FSM.  Their state changes from stopped => rotating => rotating fasted -> stopped.

## Available Scripts

In the project directory, you can run:

### `npm start`

We've already run this for you in the `Codespaces: server` terminal window below. If you need to stop the server for any reason you can just run `npm start` again to bring it back online.

Runs the app in the development mode.\
Open [http://localhost:3000/](http://localhost:3000/) in the built-in Simple Browser (`Cmd/Ctrl + Shift + P > Simple Browser: Show`) to view your running application.

The page will reload automatically when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


