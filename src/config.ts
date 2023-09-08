import { ConfigId, EnvironmentType } from "@bosonprotocol/react-kit";
import { Buffer } from "buffer";

const envName = process.env.REACT_APP_ENV_NAME as EnvironmentType;
const configId = process.env.REACT_APP_CONFIG_ID as ConfigId;

if (!envName || ["testing", "staging", "production"].indexOf(envName) < 0) {
  throw `REACT_APP_ENV_NAME env variable is missing or invalid ('${envName}')`;
}

if (!configId) {
  throw `REACT_APP_CONFIG_ID env variable is missing ('${configId}')`;
}

type ConfigFields =
  | "defaultTokens"
  | "defaultDisputeResolverId"
  | "contactSellerForExchange"
  | "minimumDisputePeriodInDays"
  | "minimumDisputeResolutionPeriodDays"
  | "buyerSellerAgreementTemplate"
  | "licenseTemplate"
  | "fairExchangePolicyRules"
  | "walletConnectProjectId"
  | "metaTxApiKey"
  | "metaTxApiIds"
  | "raiseDisputeForExchange";

const envSuffixes: Record<EnvironmentType, string | undefined> = {
  testing: "_TESTING",
  staging: "_STAGING",
  production: "_PRODUCTION",
  local: undefined
};

const EnvVariables: Array<{
  envVar: string;
  envDependent?: boolean;
  isNumber?: boolean;
  optional?: boolean;
  configField: ConfigFields;
}> = [
  {
    envVar: "REACT_APP_DEFAULT_TOKENS_LIST",
    envDependent: true,
    configField: "defaultTokens"
  },
  {
    envVar: "REACT_APP_DEFAULT_DISPUTE_RESOLVER_ID",
    envDependent: true,
    configField: "defaultDisputeResolverId"
  },
  {
    envVar: "REACT_APP_CONTACT_SELLER_FOR_EXCHANGE",
    envDependent: true,
    configField: "contactSellerForExchange"
  },
  {
    envVar: "REACT_APP_DEFAULT_TOKENS_LIST",
    envDependent: true,
    configField: "defaultTokens"
  },
  {
    envVar: "REACT_APP_DEFAULT_DISPUTE_PERIOD_DAYS",
    isNumber: true,
    configField: "minimumDisputePeriodInDays"
  },
  {
    envVar: "REACT_APP_DEFAULT_RESOLUTION_PERIOD_DAYS",
    isNumber: true,
    configField: "minimumDisputeResolutionPeriodDays"
  },
  {
    envVar: "REACT_APP_BUYER_SELLER_AGREEMENT_TEMPLATE",
    configField: "buyerSellerAgreementTemplate"
  },
  {
    envVar: "REACT_APP_RNFT_LICENSE_TEMPLATE",
    configField: "licenseTemplate"
  },
  {
    envVar: "REACT_APP_FAIR_EXCHANGE_POLICY_RULES",
    configField: "fairExchangePolicyRules"
  },
  {
    envVar: "REACT_APP_WALLET_CONNECT_PROJECT_ID",
    configField: "walletConnectProjectId"
  },
  {
    envVar: "REACT_APP_META_TX_API_KEY",
    optional: true,
    configField: "metaTxApiKey"
  },
  {
    envVar: "REACT_APP_META_TX_API_IDS",
    optional: true,
    configField: "metaTxApiIds"
  },
  {
    envVar: "REACT_APP_RAISE_DISPUTE_FOR_EXCHANGE",
    envDependent: true,
    configField: "raiseDisputeForExchange"
  }
];

let _CONFIG: Record<ConfigFields, string | number> | undefined;
if (!_CONFIG) {
  _CONFIG = {} as Record<ConfigFields, string | number>;
  EnvVariables.forEach((variable) => {
    const envVarName = variable.envDependent
      ? variable.envVar + envSuffixes[envName]
      : variable.envVar;
    if (process.env[envVarName]) {
      let envVarValue: string | number = process.env[envVarName] as string;
      if (variable.isNumber) {
        try {
          envVarValue = Number(envVarValue);
        } catch (e) {
          throw `Unable to convert env var '${envVarName}=${envVarValue}' into a number: ${e}`;
        }
      }
      (_CONFIG as Record<ConfigFields, string | number>)[variable.configField] =
        envVarValue;
    } else if (!variable.optional) {
      throw `Missing env variable '${envVarName}'`;
    }
  });
}

export const CONFIG = {
  envName,
  configId,
  ipfsMetadataStorageHeaders: getIpfsMetadataStorageHeaders(
    process.env.REACT_APP_INFURA_IPFS_PROJECT_ID,
    process.env.REACT_APP_INFURA_IPFS_PROJECT_SECRET
  ),
  ipfsProjectId: process.env.REACT_APP_INFURA_IPFS_PROJECT_ID,
  ipfsProjectSecret: process.env.REACT_APP_INFURA_IPFS_PROJECT_SECRET,
  ..._CONFIG
};

function getIpfsMetadataStorageHeaders(
  infuraProjectId?: string,
  infuraProjectSecret?: string
) {
  if (!infuraProjectId && !infuraProjectSecret) {
    return undefined;
  }

  return {
    authorization: `Basic ${Buffer.from(
      infuraProjectId + ":" + infuraProjectSecret
    ).toString("base64")}`
  };
}
