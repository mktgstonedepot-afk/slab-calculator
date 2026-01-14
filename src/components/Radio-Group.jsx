import React, { useState } from "react";

const RadioGroup = ({ options, name, onChange }) => {
  const [selected, setSelected] = useState("");

  const handleChange = (event) => {
    setSelected(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
   <div className="flex flex-col gap-3"> {/* gap-3 provides nice spacing between options */}
    {options.map((option) => (
      <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
        <input
          type="radio"
          name={name}
          value={option.value}
          checked={selected === option.value}
          onChange={handleChange}
          // h-5 w-5 makes the actual radio circle a bit bigger and clearer
          className="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
        />
        {/* This is where you control the font color and size */}
        <span className="text-base text-gray-500 font-medium group-hover:text-blue-600 transition-colors">
          {option.label}
        </span>
      </label>
    ))}
  </div>
  );
};

export default RadioGroup;
