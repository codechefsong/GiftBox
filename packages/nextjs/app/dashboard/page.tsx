"use client";

import React, { useState } from "react";
import { Bell, Gift, Menu, Package, Send } from "lucide-react";
import type { NextPage } from "next";

const Dashboard: NextPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("giftboxes");

  const giftboxes = [
    {
      id: 1,
      recipient: "John Doe",
      status: "Draft",
      messages: 12,
      tokenPot: "2.5 ETH",
    },
    {
      id: 2,
      recipient: "Sarah Smith",
      status: "Collecting",
      messages: 8,
      tokenPot: "1.2 ETH",
    },
    {
      id: 3,
      recipient: "Mike Johnson",
      status: "Ready",
      messages: 15,
      tokenPot: "0.8 ETH",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Draft":
        return "bg-gray-200 text-gray-800";
      case "Collecting":
        return "bg-blue-100 text-blue-800";
      case "Ready":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
                <tbody>
                  {giftboxes.map(giftbox => (
                    <tr key={giftbox.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            {giftbox.recipient.charAt(0)}
                          </div>
                          {giftbox.recipient}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(giftbox.status)}`}>
                          {giftbox.status}
                        </span>
                      </td>
                      <td className="p-4">{giftbox.messages}</td>
                      <td className="p-4">{giftbox.tokenPot}</td>
                      <td className="p-4">
                        <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                          <Send className="w-4 h-4 mr-2" />
                          Send
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
