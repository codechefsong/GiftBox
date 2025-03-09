import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Send Giftbox",
  description: "Send Giftbox",
});

const SendGiftboxLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default SendGiftboxLayout;
