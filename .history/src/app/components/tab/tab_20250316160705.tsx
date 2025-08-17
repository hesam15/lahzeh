"use client";

import { useState, ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  return (
    <div className="w-full max-w-md mx-auto m-4">
      {/* هدر تب‌ها */}
      <div className="flex w-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 text-sm font-medium w-full text-white ${
              activeTab === tab.id ? " bg-[#002F39]": "bg-[#004656]"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* محتوای تب‌ها */}
      <div className="mt-4 p-4 #00313CCC rounded-lg shadow">
        {tabs.map((tab) => (
          activeTab === tab.id && <div key={tab.id}>{tab.content}</div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
