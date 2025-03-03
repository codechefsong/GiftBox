import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Giftbox Invitation",
  description: "Giftbox Invitation",
});

const GiftboxInvitationLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default GiftboxInvitationLayout;
