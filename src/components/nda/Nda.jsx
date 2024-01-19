/* subscribes to AppActor, uses useState this time. */

import React, { useState, useRef } from 'react';
import { AppActor } from '../../appMachine.js';

export const Nda = () => {

  const msgDiv = useRef(null) 

  const [ text, setText ] = useState('hello')
  const  [ divColor, setDivColor ] = useState("black")

  AppActor.subscribe((snapshot) => {
    setText(snapshot.context.message)
    setDivColor( snapshot.context.color )
  })

  return (
    <div ref={msgDiv} id="nda" style={{backgroundColor: divColor}}>
      {text}
    </div>
  );
};
