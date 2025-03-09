import Link from "next/link";
import { useRouter } from "next/navigation";
import { Gift } from "lucide-react";
import { formatEther } from "viem";
import { useScaffoldReadContractWithContractAddress } from "~~/hooks/scaffold-eth/useScaffoldReadContractWithContractAddress";

export const ReceivedGiftbox = ({ address }: { address: string }) => {
  const router = useRouter();

  const { data: giftboxData } = useScaffoldReadContractWithContractAddress({
    contractName: "DigitalGiftbox",
    // @ts-ignore
    contractAddress: address,
    functionName: "getGiftboxDetails",
  });

  console.log(giftboxData);

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
            {giftboxData?.length && giftboxData[0].charAt(0)}
          </div>
          <Link
            href={`/dashboard/giftbox/${address}`}
            passHref
            className="hover:text-purple-400 py-1.5 px-3 text-sm rounded-full underline"
          >
            {giftboxData?.length && giftboxData[0]}
          </Link>
        </div>
      </td>
      <td className="p-4">0</td>
      <td className="p-4">{giftboxData?.length && formatEther(BigInt(giftboxData[7].toString()))} ETH</td>
      <td className="p-4">
        <button
          onClick={() => router.push("/dashboard/sendgiftbox/" + address)}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Gift className="w-4 h-4 mr-2" />
          Claim
        </button>
      </td>
    </tr>
  );
};
