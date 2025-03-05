import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Giftbox",
  description: "Giftbox",
});

const GiftboxLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default GiftboxLayout;
