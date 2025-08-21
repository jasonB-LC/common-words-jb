import React, { useState } from 'react';
import '../../style/drawer.css';

const Drawer = ({ children, menuIsOpen, openMenu, closeMenu}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDrawer = () => {
    closeMenu();
  };

  return (
    <>
      <button className="drawer-button" onClick={openMenu}></button>
      <div className="drawer-container" style={{width: "30%"}}>
        {/* Overlay to close drawer when clicked outside */}
        {menuIsOpen && <div className="drawer-overlay" onClick={toggleDrawer}></div>}

        <div className={`drawer ${menuIsOpen ? 'open' : ''}`}>
          <div className="drawer-content">
            {children} {/* Render content passed as children */}
          </div>
        </div>
      </div>
    </>

  );
};

export default Drawer;