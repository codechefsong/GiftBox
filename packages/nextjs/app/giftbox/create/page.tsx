"use client";

import React, { useState } from "react";
import { GiftboxPreview } from "./_components/GiftboxPreview";
import { ArrowLeft, ArrowRight, Coins, Copy, Gift, MessageSquare, Send, Sparkles, Upload } from "lucide-react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const GiftboxCreator: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    recipientName: "",
    occasion: "",
    title: "",
    senderName: "",
    aiPrompt: "",
    message: "",
    image: null,
    asset: "",
    amount: "",
  });
  const [showCopyLinkt, setShowCopyLink] = useState(false);

  const { data: giftboxAddresses } = useScaffoldReadContract({
    contractName: "DigitalGiftboxFactory",
    functionName: "getUserGiftboxes",
    args: [connectedAddress],
  });

  const { writeContractAsync: digitalGiftboxFactory } = useScaffoldWriteContract({
    contractName: "DigitalGiftboxFactory",
  });

  const occasions = [
    "Birthday",
    "Wedding",
    "Anniversary",
    "Graduation",
    "Baby Shower",
    "Farewell",
    "Thank You",
    "Other",
  ];

  //@ts-ignore
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const copyInviteLink = () => {
    if (giftboxAddresses?.length) {
      const giftboxAddress = giftboxAddresses[giftboxAddresses.length - 1];
      navigator.clipboard.writeText(`${window.location.origin}/giftbox/invitation/${giftboxAddress}`);
    }
  };

  const createGiftbox = async () => {
    try {
      const { recipientName, occasion, title } = formData;
      await digitalGiftboxFactory({
        functionName: "createGiftbox",
        args: [recipientName, occasion, title],
      });
      setShowCopyLink(true);
    } catch (e) {
      console.error("Error setting greeting:", e);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Name</label>
              <input
                type="text"
                name="recipientName"
                value={formData.recipientName}
                onChange={handleInputChange}
                placeholder="Enter recipient's name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Occasion</label>
              <select
                name="occasion"
                value={formData.occasion}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              >
                <option value="">Select an occasion</option>
                {occasions.map(occasion => (
                  <option key={occasion} value={occasion}>
                    {occasion}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Giftbox Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter giftbox title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sender Name</label>
              <input
                type="text"
                name="senderName"
                value={formData.senderName}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">AI Message Prompt</label>
              <div className="relative">
                <input
                  type="text"
                  name="aiPrompt"
                  value={formData.aiPrompt}
                  onChange={handleInputChange}
                  placeholder="Describe the message you want to generate"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none pr-12"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-600 hover:text-purple-700">
                  <Sparkles className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Write your personal message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-y"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Drop your image here or click to upload</p>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  //@ts-ignore
                  onChange={e => setFormData(prev => ({ ...prev, image: e.target.files[0] }))}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Asset</label>
              <select
                name="asset"
                value={formData.asset}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              >
                <option value="">Select digital asset</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="USDT">Tether (USDT)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-medium mb-4 text-gray-900">Giftbox Summary</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">For:</span> {formData.recipientName}
                </p>
                <p>
                  <span className="font-medium">Occasion:</span> {formData.occasion}
                </p>
                <p>
                  <span className="font-medium">Title:</span> {formData.title}
                </p>
                <p>
                  <span className="font-medium">From:</span> {formData.senderName}
                </p>
              </div>
            </div>

            {!showCopyLinkt ? (
              <button
                onClick={createGiftbox}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 outline-none"
              >
                Create
              </button>
            ) : (
              <button
                onClick={copyInviteLink}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 outline-none"
              >
                <Copy className="w-5 h-5" />
                Copy Invitation Link
              </button>
            )}
          </div>
        );
    }
  };

  const stepIcons = {
    1: <Gift className="w-6 h-6" />,
    2: <MessageSquare className="w-6 h-6" />,
    3: <Coins className="w-6 h-6" />,
    4: <Send className="w-6 h-6" />,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              {Object.entries(stepIcons).map(([step, icon]) => (
                <div
                  key={step}
                  className={`flex items-center ${
                    parseInt(step) === currentStep
                      ? "text-purple-600"
                      : parseInt(step) < currentStep
                        ? "text-green-500"
                        : "text-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-current">
                    {icon}
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {currentStep === 1 && "Basic Information"}
              {currentStep === 2 && "Add Message & Media"}
              {currentStep === 3 && "Token Contribution"}
              {currentStep === 4 && "Finalize Giftbox"}
            </h2>

            {renderStepContent()}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevStep}
                  className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 outline-none"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>
              )}

              {currentStep < 4 && (
                <button
                  onClick={handleNextStep}
                  className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 outline-none ml-auto"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <GiftboxPreview data={formData} />
      </div>
    </div>
  );
};

export default GiftboxCreator;
