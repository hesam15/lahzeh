"use client";

import { useState, ReactNode, JSX } from "react";
import { FiHeadphones, FiDownload, FiHeart, FiClock } from 'react-icons/fi';

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

    const getIcon = (id: string) => {
        switch (id) {
            case "tab1":
                return <FiHeadphones className="w-5 h-5" />;
            case "tab2":
                return <FiDownload className="w-5 h-5" />;
            case "tab3":
                return <FiHeart className="w-5 h-5" />;
            default:
                return <FiClock className="w-5 h-5" />;
        }
    };

    return (
        <div className="w-full">
            {/* هدر تب‌ها */}
            <div className="flex w-full items-center justify-between bg-gradient-to-r from-[#004C5C]/40 to-[#00333E]/40 rounded-none p-0 backdrop-blur-sm border border-white/10 shadow-lg">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`relative flex-1 py-4 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                            activeTab === tab.id 
                                ? "text-white bg-gradient-to-r from-[#004C5C] to-[#00333E] shadow-lg" 
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <span className="flex items-center gap-2">
                            {getIcon(tab.id)}
                            {tab.label}
                        </span>
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-yellow-300"></div>
                        )}
                    </button>
                ))}
            </div>

            {/* محتوای تب‌ها */}
            <div className="w-full">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={`transition-all duration-500 ease-in-out ${
                            activeTab === tab.id 
                                ? "opacity-100 translate-y-0" 
                                : "opacity-0 translate-y-4 hidden"
                        }`}
                    >
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tabs;
