import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Claim Giftbox",
  description: "Claim Giftbox",
});

const ClaimGiftboxLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ClaimGiftboxLayout;
