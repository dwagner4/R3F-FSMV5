/** imports AppActor and sends messages about clicks */

import React, { useState } from 'react';
import { AppActor } from '../../appMachine.js';

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (e) => {
    const color = e.target.style.color
    const msg = "You clicked on " + color + "."
    AppActor.send({ type: 'MENU_ITEM', data: { color: color, message: msg} })
    console.log('clicked', color )
  }

  return (
    <div id="menu">
      <button onClick={toggleMenu}>
        {isOpen ? 'Close menu' : 'Open menu'}
      </button>
      {isOpen && (
        <ul>
          <li style={{ color: 'red' }} onClick={handleClick} >Red Item</li>
          <li style={{ color: 'green' }} onClick={handleClick} >Green Item</li>
          <li style={{ color: 'blue' }} onClick={handleClick} >Blue Item</li>
        </ul>
      )}
    </div>
  );
};

