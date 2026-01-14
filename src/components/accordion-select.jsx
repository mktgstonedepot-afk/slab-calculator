const AccordionSection = ({ title, isOpen, onClick, children }) => (
  <div className="border-b border-slate-200">
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center py-6 text-left hover:bg-slate-50 transition-colors px-2"
    >
      <span className="text-xl font-bold text-slate-800">{title}</span>
      <span className="text-2xl text-slate-400">{isOpen ? "−" : "+"}</span>
    </button>
    {isOpen && (
      <div className="pb-6 px-2 animate-in fade-in slide-in-from-top-2 duration-300">
        {children}
      </div>
    )}
  </div>
);