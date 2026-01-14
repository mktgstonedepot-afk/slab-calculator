import React from "react";

const DeliveryCard = ({ value, onUpdate }) => {
  const handleChange = (e) => {
    const val = e.target.value;
    // Allow only numbers and decimals for distance
    const numericValue = val.replace(/[^0-9.]/g, "");
    onUpdate(numericValue);
  };

  return (
    <div className="w-auto bg-white border border-slate-200 rounded p-3 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="relative mt-2">
          <input
            type="text"
            placeholder="0.00"
            value={value || ""}
            onChange={handleChange}
            className="w-full px-6 py-4 bg-gray-200 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all font-bold text-slate-800 text-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryCard;