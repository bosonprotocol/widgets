import { EnvironmentType, FinanceWidget } from "@bosonprotocol/react-kit";
import { useSearchParams } from "react-router-dom";

export const financePath = "/finance";
export function Finance() {
  const [searchParams] = useSearchParams();
  const sellerId = searchParams.get("sellerId");
  const envName = searchParams.get("envName") as EnvironmentType;
  const defaultTokensList = searchParams.get("defaultTokensList");
  if (!sellerId) {
    return <p>Missing 'sellerId' query param</p>;
  }
  if (!envName) {
    return <p>Missing 'envName' query param</p>;
  }
  if (!defaultTokensList) {
    return <p>Missing 'defaultTokensList' query param</p>;
  }

  return (
    <FinanceWidget
      sellerId={sellerId}
      envName={envName}
      defaultTokensList={defaultTokensList}
    />
  );
}
