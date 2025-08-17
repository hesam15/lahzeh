"use client";

import { useState, ReactNode, JSX } from "react";

interface Tab {
    id: string;
    label: string | JSX.Element;
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
            <div className="flex w-full items-center justify-center">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`p-4 text-sm font-medium w-full text-white flex items-center justify-center ${activeTab === tab.id ? " bg-[#background: #004656;
]" : "bg-[#3d5a80]"
                            }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* محتوای تب‌ها */}
            <div className="p-4 bg-[#98c1d9] rounded-b shadow">
                {tabs.map((tab) => (
                    activeTab === tab.id && <div key={tab.id}>{tab.content}</div>
                ))}
            </div>
        </div>
    );
};

export default Tabs;
