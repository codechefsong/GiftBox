"use client";

import React, { useState } from "react";
import { Giftbox } from "./_components/Giftbox";
import { Bell, Gift, Menu, Package } from "lucide-react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const Dashboard: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("giftboxes");

  const { data: giftboxAddresses } = useScaffoldReadContract({
    contractName: "DigitalGiftboxFactory",
    functionName: "getUserGiftboxes",
    args: [connectedAddress],
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <div className={`bg-white border-r transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h1 className={`font-bold text-xl ${!isSidebarOpen && "hidden"}`}>Dashboard</h1>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {[
              { id: "giftboxes", icon: <Package />, label: "Giftboxes" },
              { id: "reminders", icon: <Bell />, label: "Reminders" },
              { id: "received", icon: <Gift />, label: "Received" },
            ].map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors
                    ${activeTab === item.id ? "bg-purple-100 text-purple-700" : "hover:bg-gray-100"}`}
                >
                  {item.icon}
                  {isSidebarOpen && <span className="ml-3">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b p-4">
          <h2 className="text-2xl font-semibold">Giftboxes</h2>
        </header>

        <main className="p-6">
          <div className="bg-white rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold text-gray-600">Recipient</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Status</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Messages</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Token Pot</th>
                    <th className="text-left p-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>{giftboxAddresses?.map(address => <Giftbox key={address} address={address} />)}</tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
