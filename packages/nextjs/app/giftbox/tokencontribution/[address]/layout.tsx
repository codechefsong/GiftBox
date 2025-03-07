import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Token Contribution",
  description: "Token Contribution",
});

const TokenContributionFormLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default TokenContributionFormLayout;
