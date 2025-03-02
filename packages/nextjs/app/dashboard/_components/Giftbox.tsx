import { Send } from "lucide-react";

export const Giftbox = ({ address }: { address: string }) => {
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
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">B</div>
          {address}
        </div>
      </td>
      <td className="p-4">
        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor("giftbox.status")}`}>giftbox.status</span>
      </td>
      <td className="p-4">0</td>
      <td className="p-4">0</td>
      <td className="p-4">
        <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          <Send className="w-4 h-4 mr-2" />
          Send
        </button>
      </td>
    </tr>
  );
};
