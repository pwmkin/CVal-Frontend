import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTabId,
  onChange,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (tabsRef.current) {
        setIsOverflowing(
          tabsRef.current.scrollWidth > tabsRef.current.clientWidth
        );
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [tabs]);

  useEffect(() => {
    if (tabsRef.current && activeTab) {
      const activeElement = tabsRef.current.querySelector(
        `[data-tab-id="${activeTab}"]`
      ) as HTMLElement;
      if (activeElement) {
        const containerRect = tabsRef.current.getBoundingClientRect();
        const activeRect = activeElement.getBoundingClientRect();

        if (
          activeRect.left < containerRect.left ||
          activeRect.right > containerRect.right
        ) {
          const scrollPosition =
            activeElement.offsetLeft -
            tabsRef.current.offsetLeft -
            containerRect.width / 2 +
            activeRect.width / 2;
          tabsRef.current.scrollTo({
            left: scrollPosition,
            behavior: "smooth",
          });
        }
      }
    }
  }, [activeTab]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  const scrollLeft = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  return (
    <div className={`w-full  ${className}`}>
      <div className="border-b border-gray-200 dark:border-gray-800 relative">
        {isOverflowing && (
          <>
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center h-8 w-8 bg-white dark:bg-gray-800 bg-opacity-75 rounded-full shadow-sm"
              aria-label="Swipe to the left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-gray-500"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center h-8 w-8 bg-white dark:bg-gray-800 bg-opacity-75 rounded-full shadow-sm"
              aria-label="Swipe to the right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-gray-500"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </>
        )}

        <div
          ref={tabsRef}
          className="flex space-x-1 overflow-x-auto scrollbar-hide scroll-smooth px-1 md:px-0"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-tab-id={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`relative flex items-center space-x-2 py-2 px-3 sm:px-4 text-sm font-medium -mb-px transition-colors whitespace-nowrap flex-shrink-0
                ${
                  activeTab === tab.id
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="absolute inset-x-0 bottom-0 h-1 bg-blue-500 dark:bg-blue-400"
                  initial={false}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
