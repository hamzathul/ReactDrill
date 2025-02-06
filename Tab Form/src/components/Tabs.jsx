import { useState } from "react";
import Interests from "./Interests";
import Profile from "./Profile";
import Settings from "./Settings";

export default Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 1, name: "profile" },
    { id: 2, name: "interests" },
    { id: 3, name: "settings" },
  ];
  return (
    <div>
      <div className="">
        {tabs.map((tab) => {
          return (
            <button
              key={tab.id}
              className={`buttons ${
                tab.name === activeTab ? "button-active" : ""
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
