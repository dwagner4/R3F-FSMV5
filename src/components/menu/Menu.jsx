import React, { useState } from 'react';
import { AppActor } from '../../App';

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (e) => {
    const msg = "You clicked on " + e.target.style.color + "."
    AppActor.send({ type: 'MENU_ITEM', data: { color: e.target.style.color, message: msg} })
    console.log('clicked', e.target.style.color )
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

