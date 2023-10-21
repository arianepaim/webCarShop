import React, { useState } from 'react';

const DropdownExample = () => {
  const [options, setOptions] = useState(['Option 1', 'Option 2', 'Option 3']);

  return (
    <div>
      <button className="dropdown-toggle" type="button" data-toggle="dropdown">
        Dropdown Button
      </button>
      <div className="dropdown-menu">
        {options.map((option, index) => (
          <a key={index} className="dropdown-item" href="#">
            {option}
          </a>
        ))}
      </div>
    </div>
  );
}

export default DropdownExample;

