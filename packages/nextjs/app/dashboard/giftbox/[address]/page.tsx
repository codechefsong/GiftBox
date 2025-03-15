"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSlider } from "../../_components/MessageSlider";
import { Coins, MessageSquare } from "lucide-react";
import { useScaffoldReadContractWithContractAddress } from "~~/hooks/scaffold-eth/useScaffoldReadContractWithContractAddress";

const GiftboxMessages = ({ params }: { params: { address: string } }) => {
  const router = useRouter();

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

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

  const currentMessage = giftboxMessages?.length ? giftboxMessages[currentMessageIndex] : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Giftbox</h2>

          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => router.push("/giftbox/messagecontribution/" + params.address)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Add a message
            </button>
            <button
              onClick={() => router.push("/giftbox/tokencontribution/" + params.address)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Coins className="w-4 h-4" />
              Add a contribution
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-6 mb-4">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {(giftboxData?.length && giftboxData[2]) || "Your Gift Title"}
              </h3>
              <p className="text-gray-600">{(giftboxData?.length && giftboxData[3]) || "Special Occasion"}</p>
            </div>

            <div className="space-y-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">To</p>
                <p className="font-medium text-gray-800">
                  {(giftboxData?.length && giftboxData[1]) || "Recipient Name"}
                </p>
              </div>

              {giftboxData?.length && (
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Message</p>
                  <p className="text-gray-800">{giftboxData[10]}</p>
                </div>
              )}

              {/* {data.image && (
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-2">Attached Image</p>
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <Image
                      src={URL.createObjectURL(data.image)}
                      alt="Preview"
                      className="max-h-full rounded-lg object-cover"
                    />
                  </div>
                </div>
              )} */}

              {/* {data.asset && data.amount && (
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Contribution</p>
                  <p className="font-medium text-gray-800">
                    {data.amount} {data.asset}
                  </p>
                </div>
              )} */}

              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">From</p>
                <p className="font-medium text-gray-800">{(giftboxData?.length && giftboxData[0]) || "Your Name"}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 mt-3">Messages & Contributions</h2>
          <div className="relative">
            {currentMessage && (
              <div className="p-4 border rounded-lg bg-gray-50 relative overflow-hidden">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                    {currentMessage.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">{currentMessage.name}</span>
                    <span className="text-sm text-gray-500 ml-2">10 mins ago</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {currentMessageIndex + 1} / {giftboxMessages.length}
                  </div>
                </div>

                <p className="ml-10">{currentMessage.text}</p>
              </div>
            )}
          </div>

          <MessageSlider messages={giftboxMessages} onMessageChange={setCurrentMessageIndex} />
        </div>
      </div>
    </div>
  );
};

export default GiftboxMessages;
