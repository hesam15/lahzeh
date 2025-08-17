"use client";

import Image from "next/image";

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  onClick: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {actions.map((action) => (
        <button
          key={action.id}
          className="bg-[#004C5C] rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-[#005C6C] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#004C5C]/20"
          onClick={action.onClick}
        >
          <div className="relative w-8 h-8">
            <Image
              src={action.icon}
              alt={action.label}
              fill
              className="object-contain"
            />
          </div>
          <span className="text-sm font-medium">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions; 