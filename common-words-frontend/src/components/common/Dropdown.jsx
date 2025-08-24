import React, { useEffect, useState } from 'react';

function Dropdown({ dropdownName, options, curValue, onSelect, curLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    setSelectedOption(0);
  }, [curLang])
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : 'Select an Option'}
        <span className="arrow-icon">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li key={dropdownName + option.value} value={curValue} id={option.value} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;