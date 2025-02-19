import Image from "next/image";

interface Giftbox {
  recipientName: string;
  occasion: string;
  title: string;
  senderName: string;
  aiPrompt: string;
  message: string;
  image: any;
  asset: string;
  amount: number;
}

type GiftboxProps = {
  data: Giftbox;
};

export const GiftboxPreview = ({ data }: GiftboxProps) => {
  const calculateCompletion = (data: Giftbox) => {
    const fields = ["recipientName", "occasion", "title", "senderName"];
    //@ts-ignore
    const completedFields = fields.filter(field => data[field]?.trim()).length;
    return Math.round((completedFields / fields.length) * 100);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Preview</h2>

      <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-6 mb-4">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{data.title || "Your Gift Title"}</h3>
          <p className="text-gray-600">{data.occasion || "Special Occasion"}</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">To</p>
            <p className="font-medium text-gray-800">{data.recipientName || "Recipient Name"}</p>
          </div>

          {data.message && (
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Message</p>
              <p className="text-gray-800">{data.message}</p>
            </div>
          )}

          {data.image && (
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
          )}

          {data.asset && data.amount && (
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-1">Contribution</p>
              <p className="font-medium text-gray-800">
                {data.amount} {data.asset}
              </p>
            </div>
          )}

          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">From</p>
            <p className="font-medium text-gray-800">{data.senderName || "Your Name"}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-500">
        <p>Form completion: {calculateCompletion(data)}%</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${calculateCompletion(data)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
