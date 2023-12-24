/* subscribes to AppActor, uses useState this time. */

import React, { useState, useRef } from 'react';
import { AppActor } from '../../App';

export const Nda = () => {

  const msgDiv = useRef(null) 

  const [ text, setText ] = useState('hello')

  AppActor.subscribe((snapshot) => {
    setText(snapshot.context.message)
    msgDiv.current.style.backgroundColor = snapshot.context.color
  })

  return (
    <div ref={msgDiv} id="nda" style={{backgroundColor: "black"}}>
      {text}
    </div>
  );
};
