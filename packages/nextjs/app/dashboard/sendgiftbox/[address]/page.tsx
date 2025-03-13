"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Copy, Mail, Send, Wallet } from "lucide-react";
import { formatEther } from "viem";
import { useScaffoldReadContractWithContractAddress } from "~~/hooks/scaffold-eth/useScaffoldReadContractWithContractAddress";
import { useScaffoldWriteContractWithContractAddress } from "~~/hooks/scaffold-eth/useScaffoldWriteContractWithContractAddress";

const SendGiftbox = ({ params }: { params: { address: string } }) => {
  const router = useRouter();

  const [deliveryMethod, setDeliveryMethod] = useState("email");
  const [recipientInfo, setRecipientInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const { writeContractAsync: DigitalGiftbox } = useScaffoldWriteContractWithContractAddress(
    "DigitalGiftbox",
    params.address,
  );

  const { data: giftboxData } = useScaffoldReadContractWithContractAddress({
    contractName: "DigitalGiftbox",
    // @ts-ignore
    contractAddress: params.address,
    functionName: "getGiftboxDetails",
  });

  const { data: giftboxMessages = [] } = useScaffoldReadContractWithContractAddress({
    contractName: "DigitalGiftbox",
    // @ts-ignore
    contractAddress: params.address,
    functionName: "getGiftboxMessages",
  });

  console.log(giftboxData);

  const title = giftboxData?.length ? giftboxData[2] : "Title";
  const amount = giftboxData?.length ? giftboxData[7] : "0";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(deliveryMethod);

    if (deliveryMethod === "email") {
      initiateEmailClaim();
    } else {
      initiateWalletClaim();
    }
  };

  const initiateWalletClaim = async () => {
    setIsLoading(true);

    try {
      await DigitalGiftbox({
        functionName: "setRecipientAddress",
        args: [recipientInfo],
      });

      setIsLoading(false);
      setIsSent(true);
    } catch (err) {
      console.error("Error sending giftbox");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const initiateEmailClaim = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/initiate-claim`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ giftAddress: params.address, email: recipientInfo }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initiate claim");
      }

      console.log(data);
      await saveEmail(data.verificationTokenHex);
    } catch (err) {
      console.error("Error sending email", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const saveEmail = async (verificationTokenHex: string) => {
    try {
      await DigitalGiftbox({
        functionName: "setRecipientEmail",
        args: [verificationTokenHex],
      });

      setIsLoading(false);
      setIsSent(true);
    } catch (err) {
      console.error("Error sending giftbox");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/giftbox/invitation/${params.address}`);
  };

  if (isSent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Giftbox Sent!</h2>
            <p className="text-gray-600 mb-6">
              {deliveryMethod === "email"
                ? `Your giftbox has been sent to ${recipientInfo}`
                : `Your giftbox has been sent to wallet ${recipientInfo.substring(0, 6)}...${recipientInfo.substring(recipientInfo.length - 4)}`}
            </p>

            <div className="border rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500 mb-2">Share with others:</p>
              <div className="flex items-center">
                <input
                  type="text"
                  value={`${window.location.origin}/giftbox/invitation/${params.address}`}
                  readOnly
                  className="flex-1 border rounded-l-lg p-2 text-sm bg-gray-50"
                />
                <button onClick={copyLink} className="bg-purple-600 text-white p-2 rounded-r-lg">
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-x-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => router.push("/giftbox/create")}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Create New Giftbox
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Giftbox
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Send Your Giftbox</h1>

          <div className="mb-8">
            <div className="bg-purple-50 rounded-lg p-4 flex items-start">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                {/* <img 
                  src="/api/placeholder/64/64" 
                  alt="Giftbox preview" 
                  className="rounded-lg"
                /> */}
              </div>
              <div>
                <h2 className="font-medium text-lg">{title}</h2>
                <p className="text-gray-600 text-sm">
                  {giftboxMessages.length} messages • {formatEther(BigInt(amount))} ETH collected
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Delivery Method</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod("email")}
                  className={`p-4 border rounded-lg flex items-center ${
                    deliveryMethod === "email" ? "border-purple-600 bg-purple-50" : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Mail
                    className={`w-5 h-5 mr-3 ${deliveryMethod === "email" ? "text-purple-600" : "text-gray-500"}`}
                  />
                  <div className="text-left">
                    <p className="font-medium">Email</p>
                    <p className="text-xs text-gray-500">Send via email</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod("wallet")}
                  className={`p-4 border rounded-lg flex items-center ${
                    deliveryMethod === "wallet" ? "border-purple-600 bg-purple-50" : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Wallet
                    className={`w-5 h-5 mr-3 ${deliveryMethod === "wallet" ? "text-purple-600" : "text-gray-500"}`}
                  />
                  <div className="text-left">
                    <p className="font-medium">Wallet</p>
                    <p className="text-xs text-gray-500">Send to wallet address</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                {deliveryMethod === "email" ? "Recipient Email" : "Wallet Address"}
              </label>
              <input
                type={deliveryMethod === "email" ? "email" : "text"}
                value={recipientInfo}
                onChange={e => setRecipientInfo(e.target.value)}
                placeholder={deliveryMethod === "email" ? "Enter email address" : "Enter wallet address"}
                className="w-full border border-gray-300 rounded-lg p-3"
                required
              />
              {deliveryMethod === "wallet" && (
                <p className="text-xs text-gray-500 mt-1">Make sure to enter the correct wallet address</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
              >
                {isLoading ? (
                  <>Loading...</>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Now
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendGiftbox;
