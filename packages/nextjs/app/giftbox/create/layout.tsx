import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Giftbox Creator",
  description: "Giftbox Creator",
});

const GiftboxCreatorLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default GiftboxCreatorLayout;
