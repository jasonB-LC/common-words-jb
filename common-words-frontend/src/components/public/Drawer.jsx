import React, { useState } from 'react';
import '../../style/Drawer.css';

const Drawer = ({ children, menuIsOpen, closeMenu}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDrawer = () => {
    closeMenu();
  };

  return (
    <div className="drawer-container" style={{width: "30%"}}>
      {/* Overlay to close drawer when clicked outside */}
      {menuIsOpen && <div className="drawer-overlay" onClick={toggleDrawer}></div>}

      <div className={`drawer ${menuIsOpen ? 'open' : ''}`}>
        <button onClick={toggleDrawer} className="drawer-toggle-button">
          {menuIsOpen ? 'Close' : 'Open'} Menu
        </button>
        <div className="drawer-content">
          {children} {/* Render content passed as children */}
        </div>
      </div>
    </div>
  );
};

export default Drawer;