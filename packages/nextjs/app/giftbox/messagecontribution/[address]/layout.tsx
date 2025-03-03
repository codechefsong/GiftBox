import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Message Contribution",
  description: "Message Contribution",
});

const MessageContributionFormLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default MessageContributionFormLayout;
