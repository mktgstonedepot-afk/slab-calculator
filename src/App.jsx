import React, { useState } from "react";
import Button from "./components/Button";
import Card from "./components/Card";
import DataTable from "./components/Table"; 
import DeliveryCard from "./components/Delivery-Card";
import RadioGroup from "./components/Radio-Group";
import { BRAND_PRICE } from "./prices";

function App() {
  const [cards, setCards] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [slabData, setSlabData] = useState({});
  const [distance, setDistance] = useState(0);
  const [floors, setFloors] = useState(0);
  
  // --- Handlers ---
  const handleAdd = () => {
    const newId = cards.length > 0 ? Math.max(...cards) + 1 : 1;
    setCards([...cards, newId]);
    setActiveId(newId);
    setSlabData({
      ...slabData,
      [newId]: { length: "", width: "", number: "", material: "" }
    });
  };

  const handleDelete = (id) => {
    setCards(cards.filter((c) => c !== id));
    const newData = { ...slabData };
    delete newData[id];
    setSlabData(newData);
    if (id === activeId) {
      const remaining = cards.filter((c) => c !== id);
      setActiveId(remaining.length > 0 ? remaining[remaining.length - 1] : null);
    }
  };

  const brandOptions = [
  { label: "Stone Depot Laguna", value: "laguna" },
  { label: "Stone Depot Cebu", value: "cebu" },
  { label: "Stone Depot Davao", value: "davao" },
  { label: "Stone Depot Iloilo", value: "iloilo" },
  { label: "Stone Depot Cagayan de Oro", value: "cagayan" }
  ];

  const [currentBranch, setCurrentBranch] = useState("laguna");
  const [materialPrices, setMaterialPrices] = useState(BRAND_PRICE.laguna);

 const handlePriceChange = (branchId) => {
  // 1. Get the new price list for the selected branch
  const newPrices = BRAND_PRICE[branchId];
  
  // 2. Update states
  setMaterialPrices(newPrices);
  setCurrentBranch(branchId);

  // 3. Safety Check: Clear selected materials in cards if they don't exist in the new branch
  const updatedSlabData = { ...slabData };
  let needsUpdate = false;

  Object.keys(updatedSlabData).forEach((id) => {
    const selectedMaterial = updatedSlabData[id].material;
    
    // If the slab has a material that isn't in the new branch's price list, reset it
    if (selectedMaterial && (!newPrices || !newPrices[selectedMaterial])) {
      updatedSlabData[id].material = ""; 
      needsUpdate = true;
    }
  });

  if (needsUpdate) {
    setSlabData(updatedSlabData);
  }
};
  

  // --- 1. Calculations ---
  
  const numDistance = Number(distance) || 0;
  const numFloors = Number(floors) || 0;

  const totalSlabCount = Object.values(slabData).reduce((sum, s) => sum + (Number(s.number) || 0), 0);
  const totalUnits = totalSlabCount; // Used for footer display

  const calculatedDeliveryFee = numDistance <= 13 ? numDistance * 130 : numDistance * 70;
  const calculatedHaulingFee = numFloors * totalSlabCount * 500;

  // Build Slab Rows
  const slabRows = Object.entries(slabData).map(([id, slab]) => {
    const qty = Number(slab.number) || 0;
    const l = Number(slab.length) || 0;
    const w = Number(slab.width) || 0;
    const unitPrice = materialPrices[slab.material] || 0;
    
    const totalArea = qty * l * w;
    const totalSlabCost = totalArea * unitPrice;

    return {
      name: `Slab ${id} (${slab.material || 'No Material'})`,
      units: totalArea.toFixed(2),
      costs: `Php ${totalSlabCost.toLocaleString()}`
    };
  });

  const slabSubtotal = Object.values(slabData).reduce((sum, slab) => {
    const qty = Number(slab.number) || 0;
    const l = Number(slab.length) || 0;
    const w = Number(slab.width) || 0;
    const unitPrice = materialPrices[slab.material] || 0;
    return sum + (qty * l * w * unitPrice);
  }, 0);

  const deliveryRow = {
    name: "Delivery Fee",
    units: `${numDistance} km`,
    costs: `Php ${calculatedDeliveryFee.toLocaleString()}`
  };

  const haulingRow = {
    name: "Hauling Fee",
    units: `${numFloors} Floor(s)`,
    costs: `Php ${calculatedHaulingFee.toLocaleString()}`
  };

  const finalTableData = [...slabRows, deliveryRow, haulingRow];
  const grandTotal = slabSubtotal + calculatedDeliveryFee + calculatedHaulingFee;

  // Added missing column definitions
  const tableColumns = [
    { title: 'Item Description', key: 'name', flex: 2 },
    { title: 'Units', key: 'units', flex: 1 },
    { title: 'Costs', key: 'costs', flex: 1 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8 md:p-24 text-black">
      <h1 className="text-3xl font-bold mb-6 tracking-tight">Quote Builder</h1>
      {/* LEFT COLUMN: Stacks items vertically */}

      {/* Stone Depot Branch */}
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex flex-col gap-8"> 
          <div>
            <p className="text-xl text-gray-700 font-bold uppercase tracking-wider">Nearest Stone Depot Branch</p>
            <p className="text-sm text-gray-500 mb-4">Which Stone Depot branch is nearest from you? </p>
            <div className="max-w-sm ">
              <RadioGroup 
                name="pricing"
                options={brandOptions}
                onChange={handlePriceChange}
              />
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t border-gray-200">
            <p className="text-xl text-gray-700 font-bold uppercase tracking-wider">Supply</p>
            <p className="text-sm text-gray-500">Add slabs to calculate material costs.</p>
            <Button onClick={handleAdd}>+ Add Slab</Button>
            <div className="space-y-4">
              {cards.map((id) => (
                <Card
                  key={id}
                  id={id}
                  isActive={id === activeId}
                  data={slabData[id]}
                  onDelete={handleDelete}
                  onClick={() => setActiveId(id)}
                  onUpdate={(data) => setSlabData({ ...slabData, [id]: data })}
                  // ADD THIS LINE:
                  branchId={currentBranch} 
                />
              ))}
            </div>
          </div>
          
          
        </div>

        <div className="flex-1 flex flex-col gap-8">

          <div className="pt-8 border-t border-gray-200">
            <p className="text-xl text-gray-700 font-bold uppercase tracking-wider mb-2">Delivery Fee</p>
            <p className="text-sm text-gray-500 mb-4">Find the distance to the nearest Stone Depot branch. Go to Google and type 'Your location to Stone Depot'. </p>
            <div className="max-w-sm">
              <DeliveryCard 
                value={distance} 
                onUpdate={(val) => setDistance(val)} 
              />
            </div>
          </div>

          
          <div className="pt-8 border-t border-gray-200">
            <p className="text-xl text-gray-700 font-bold uppercase tracking-wider">Hauling Fee</p>
            <p className="text-sm text-gray-500 mb-4">A service fee for manual hauling of slabs to the designated floor number. </p>
            <div className="max-w-sm">
              <DeliveryCard 
                value={floors} 
                onUpdate={(val) => setFloors(val)} 
              />
            </div>
          </div>
          
        </div>

       
        

        <div className="w-full md:w-1/3">
          <div className="sticky top-8">
            <h2 className="text-sm font-bold uppercase text-gray-400 mb-4 tracking-widest">Order Summary</h2>
            <DataTable 
              columns={tableColumns} 
              data={finalTableData} 
              footerData={{
                name: 'Total',
                units: totalUnits,
                costs: `Php ${grandTotal.toLocaleString()}`
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;