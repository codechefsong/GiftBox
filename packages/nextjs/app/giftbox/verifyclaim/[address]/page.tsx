"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Check, Lock, Sparkles } from "lucide-react";
import { formatEther } from "viem";
import { useScaffoldReadContractWithContractAddress } from "~~/hooks/scaffold-eth/useScaffoldReadContractWithContractAddress";

const ClaimGiftbox = ({ params }: { params: { address: string } }) => {
  const { data: giftboxData = [] } = useScaffoldReadContractWithContractAddress({
    contractName: "DigitalGiftbox",
    // @ts-ignore
    contractAddress: params.address,
    functionName: "getGiftboxDetails",
  });

  console.log(giftboxData);

  const { data: giftboxMessages = [] } = useScaffoldReadContractWithContractAddress({
    contractName: "DigitalGiftbox",
    // @ts-ignore
    contractAddress: params.address,
    functionName: "getGiftboxMessages",
  });

  const [verificationToken, setVerificationToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [claimed, setClaimed] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log(token);

    setTimeout(() => {
      setVerificationToken(token || "a");
      setLoading(false);
    }, 1000);
  }, []);

  const handleClaim = () => {
    if (!walletAddress && !claimed) {
      setError("Please enter your wallet address");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setClaimed(true);
      setError("");
    }, 1500);
  };

  const amount = giftboxData?.length ? giftboxData[7] : "0";

  if (loading && !giftboxData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-medium text-gray-700">Verifying your giftbox...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {!claimed ? (
          <>
            <div className="relative">
              <div className="inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h1 className="text-2xl font-bold">{giftboxData[2]}</h1>
                  <p>From: {giftboxData[1]}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Message Count:</span>
                  <span className="font-medium">{giftboxMessages.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Value:</span>
                  <span className="font-medium">{formatEther(BigInt(amount))} ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Verification:</span>
                  <span className="font-medium flex items-center text-green-600">
                    <Check className="w-4 h-4 mr-1" /> Valid
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Enter your wallet address to claim</label>
                <div className="flex">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={walletAddress}
                      onChange={e => setWalletAddress(e.target.value)}
                      placeholder="0x..."
                      className={`w-full border ${error ? "border-red-500" : "border-gray-300"} rounded-l-lg p-3`}
                    />
                    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                  </div>
                  <button
                    onClick={handleClaim}
                    className="bg-purple-600 text-white px-4 rounded-r-lg hover:bg-purple-700 flex items-center"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <Lock className="w-5 h-5 text-purple-600 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-sm text-gray-600">
                    Your verification token:{" "}
                    <span className="font-mono bg-white px-2 py-1 rounded border">
                      {verificationToken?.substring(0, 8)}...
                      {verificationToken?.substring(verificationToken.length - 4)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold mb-2">Giftbox Claimed!</h2>
            <p className="text-gray-600 mb-6">
              Congratulations! The giftbox has been successfully transferred to your wallet.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Wallet:</span>
                <span className="font-mono">
                  {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-mono">0xce8d...93b2</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimGiftbox;
