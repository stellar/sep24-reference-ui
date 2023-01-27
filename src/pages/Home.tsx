import { InfoBlock } from "@stellar/design-system";

export const Home = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <>
      {errorMessage ? (
        <InfoBlock variant={InfoBlock.variant.error}>{errorMessage}</InfoBlock>
      ) : null}
      <div>Home</div>
    </>
  );
};
