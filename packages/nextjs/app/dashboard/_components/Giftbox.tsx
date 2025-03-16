import Link from "next/link";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { formatEther } from "viem";
import { useScaffoldReadContractWithContractAddress } from "~~/hooks/scaffold-eth/useScaffoldReadContractWithContractAddress";

export const Giftbox = ({ address }: { address: string }) => {
  const router = useRouter();

  const { data: giftboxData } = useScaffoldReadContractWithContractAddress({
    contractName: "DigitalGiftbox",
    // @ts-ignore
    contractAddress: address,
    functionName: "getGiftboxDetails",
  });

  const { data: giftboxMessages = [] } = useScaffoldReadContractWithContractAddress({
    contractName: "DigitalGiftbox",
    // @ts-ignore
    contractAddress: address,
    functionName: "getGiftboxMessages",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Not Send":
        return "bg-gray-200 text-gray-800";
      case "Sent":
        return "bg-blue-100 text-blue-800";
      case "Ready":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  console.log(giftboxData);

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
            {giftboxData?.length && giftboxData[1].charAt(0)}
          </div>
          <Link
            href={`/dashboard/giftbox/${address}`}
            passHref
            className="hover:text-purple-400 py-1.5 px-3 text-sm rounded-full underline"
          >
            {giftboxData?.length && giftboxData[1]}
          </Link>
        </div>
      </td>
      <td className="p-4">
        {giftboxData?.length && (
          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(giftboxData[6])}`}>{giftboxData[6]}</span>
        )}
      </td>
      <td className="p-4">{giftboxMessages.length}</td>
      <td className="p-4">{giftboxData?.length && formatEther(BigInt(giftboxData[7].toString()))} ETH</td>
      <td className="p-4">
        <button
          onClick={() => router.push("/dashboard/sendgiftbox/" + address)}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Send className="w-4 h-4 mr-2" />
          Send
        </button>
      </td>
    </tr>
  );
};
