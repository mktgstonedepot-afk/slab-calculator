import React from "react";
import { BRANCH_INVENTORY } from "../inventory";

const Card = ({ id, isActive, onDelete, onClick, data, onUpdate, branchId, availablePrices = {}}) => {

  const currentBranchGroups = BRANCH_INVENTORY[branchId] || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "number" || name === "length" || name === "width") {
      // Only allow numbers (length/width can be decimals, number is integer)
      newValue = name === "number" ? value.replace(/\D/g, "") : value;
    }

    const updatedData = { ...data, [name]: newValue };
    onUpdate(updatedData); // Send new data to parent
  };

  return (
    <div
      className={`max-w-sm w-full rounded-lg overflow-hidden shadow-sm bg-white p-4 transition-all duration-300 border border-gray-200 
        ${isActive ? "h-auto" : "h-12 overflow-hidden cursor-pointer"}`}
      onClick={() => onClick(id)}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-gray-700 font-bold text-sm uppercase tracking-wider">Slab #{id}</h2>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
        >
          &minus;
        </button>
      </div>

      {isActive && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="font-bold text-sm uppercase tracking-wider text-gray-700">Length:</label>
            <input
              type="number"
              name="length"
              value={data.length}
              onChange={handleChange}
              className={`border border-gray-300 rounded-md px-3 py-2 bg-white outline-none transition-all ${
                data.length > 0 ? "text-gray-500 font-semibold" : "text-gray-400"
              }`}
              placeholder="Enter length"
              min="0"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold text-sm uppercase tracking-wider text-gray-700">Width:</label>
            <input
              type="number"
              name="width"
              value={data.width}
              onChange={handleChange}
              className={`border border-gray-300 rounded-md px-3 py-2 bg-white outline-none transition-all ${
                data.width > 0 ? "text-gray-600 font-semibold" : "text-gray-400"
              }`}
              placeholder="Enter width"
              min="0"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold text-sm uppercase tracking-wider text-gray-700">Number of Slabs:</label>
            <input
              type="number"
              name="number"
              value={data.number}
              onChange={handleChange}
              className={`border border-gray-300 rounded-md px-3 py-2 bg-white outline-none transition-all ${
                data.number > 0 ? "text-gray-600 font-semibold" : "text-gray-400"
              }`}
              placeholder="Enter number of slabs"
              min="1"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold text-sm uppercase tracking-wider text-gray-700">
              Slab Material:
            </label>
            <select 
              name="material" 
              value={data.material} 
              onChange={handleChange} 
              className={`border border-gray-300 rounded-md px-3 py-2 bg-white outline-none transition-all ${
                data.material !== "" ? "text-gray-600 font-semibold" : "text-gray-400"
              }`}
            >
              <option value="" disabled>Select material</option>
              
              {BRANCH_INVENTORY[branchId] && Object.entries(BRANCH_INVENTORY[branchId]).map(([groupName, stones]) => (
                <optgroup label={groupName} key={groupName} className="font-bold text-gray-600">
                  {stones.map((stone) => (
                    <option key={stone} value={stone} className="font-normal not-italic text-black">
                      {stone.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
