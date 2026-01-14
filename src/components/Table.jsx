import React from 'react';

const DataTable = ({ columns, data, footerData }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {columns.map((col) => (
              <th 
                key={col.key} 
                className="p-4 font-bold text-gray-700 text-sm uppercase tracking-wider"
                style={{ width: col.flex ? `${(col.flex / 4) * 100}%` : 'auto' }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              // Apply the amber background if it's the delivery row
              className={`hover:bg-gray-50 transition-colors ${row.isDelivery ? 'bg-amber-50' : ''}`}
            >
              {columns.map((col) => (
                <td key={col.key} className="p-4 text-gray-600 text-sm">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {footerData && (
          <tfoot>
            <tr className="border-t-2 border-gray-200 bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="p-4 font-bold text-black text-sm">
                  {footerData[col.key]}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default DataTable;