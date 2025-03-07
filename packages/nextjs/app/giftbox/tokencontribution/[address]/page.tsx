"use client";

import React, { useState } from "react";
import { ArrowRight, Coins, Gift } from "lucide-react";
import { parseEther } from "viem";
import { useScaffoldWriteContractWithContractAddress } from "~~/hooks/scaffold-eth/useScaffoldWriteContractWithContractAddress";

const TokenContributionForm = ({ params }: { params: { address: string } }) => {
  const { writeContractAsync: DigitalGiftbox } = useScaffoldWriteContractWithContractAddress(
    "DigitalGiftbox",
    params.address,
  );

  const [formData, setFormData] = useState({
    name: "",
    asset: "ETH",
    amount: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await DigitalGiftbox({
        functionName: "addContribution",
        value: parseEther(formData.amount),
      });

      setIsSubmitting(false);
    } catch (e) {
      console.error("Error stealing milk", e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-purple-600 p-6 text-white">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Gift className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Contribute to Gift</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="asset" className="block text-sm font-medium text-gray-700">
              Digital Asset
            </label>
            <div className="relative">
              <select
                id="asset"
                name="asset"
                value={formData.asset}
                onChange={handleInputChange}
                className="w-full appearance-none px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition pr-10"
              >
                <option value="ETH">Ethereum (ETH)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Coins className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <div className="relative">
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
                min="0.001"
                step="0.001"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500">ETH</span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition
                ${isSubmitting ? "bg-purple-400 cursor-not-allowed" : "hover:bg-purple-700"}`}
            >
              <span>Contribute Now</span>
              {isSubmitting ? (
                <svg
                  className="animate-spin w-5 h-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TokenContributionForm;
