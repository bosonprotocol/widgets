import {
  ConfigId,
  EnvironmentType,
  getEnvConfigById
} from "@bosonprotocol/react-kit";
import { Buffer } from "buffer";

const envName = process.env.REACT_APP_ENV_NAME as EnvironmentType;

if (!envName || ["testing", "staging", "production"].indexOf(envName) < 0) {
  throw `REACT_APP_ENV_NAME env variable is missing or invalid ('${envName}')`;
}

type ConfigFields =
  | "contactSellerForExchange"
  | "minimumDisputePeriodInDays"
  | "minimumDisputeResolutionPeriodDays"
  | "buyerSellerAgreementTemplate"
  | "licenseTemplate"
  | "fairExchangePolicyRules"
  | "walletConnectProjectId"
  | "metaTxApiKeyMap"
  | "metaTxApiIdsMap"
  | "raiseDisputeForExchange"
  | "ipfsGateway";

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
    envVar: "REACT_APP_CONTACT_SELLER_FOR_EXCHANGE",
    envDependent: true,
    configField: "contactSellerForExchange"
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
    envVar: "REACT_APP_META_TX_API_KEY_MAP",
    optional: true,
    configField: "metaTxApiKeyMap"
  },
  {
    envVar: "REACT_APP_META_TX_API_IDS_MAP",
    optional: true,
    configField: "metaTxApiIdsMap"
  },
  {
    envVar: "REACT_APP_RAISE_DISPUTE_FOR_EXCHANGE",
    envDependent: true,
    configField: "raiseDisputeForExchange"
  },
  {
    envVar: "REACT_APP_IPFS_GATEWAY",
    configField: "ipfsGateway"
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

type ApiId = string;
type ApiKey = string;
type TokenName = string;
type ChainId = number;

type PartialRecord<K extends ConfigId | EnvironmentType, T> = {
  [P in K]?: T;
};
type MetaTxApiKeyLong = PartialRecord<ConfigId, ApiKey>;
type MetaTxApiKeyShort = PartialRecord<EnvironmentType, ApiKey>;

type MetaTxApiIdsLong = PartialRecord<
  ConfigId,
  Record<TokenName | "protocol", ApiId>
>;
type MetaTxApiIdsShort = Record<
  ChainId,
  { apiId: ApiId; tokens?: Array<TokenName> }
>;

export function getMetaTxConfig(configId: ConfigId): {
  apiKey: string;
  apiIds: string;
} {
  let apiKey = "";
  let apiIds = "";
  const { chainId } = getEnvConfigById(envName, configId);
  try {
    const apiKeysPerConfigId = JSON.parse(
      (CONFIG.metaTxApiKeyMap as string) || "{}"
    ) as MetaTxApiKeyLong | MetaTxApiKeyShort;
    apiKey =
      (apiKeysPerConfigId as MetaTxApiKeyLong)[configId] ||
      (apiKeysPerConfigId as MetaTxApiKeyShort)[envName] ||
      "";
  } catch (error) {
    console.error(error);
  }
  try {
    const apiIdsPerConfigId = JSON.parse(
      (CONFIG.metaTxApiIdsMap as string) || "{}"
    ) as MetaTxApiIdsLong | MetaTxApiIdsShort;
    const apiIdsObj =
      (apiIdsPerConfigId as MetaTxApiIdsLong)[configId] ||
      (apiIdsPerConfigId as MetaTxApiIdsShort)[chainId];
    if (apiIdsObj["apiId"]) {
      // short format --> build the long format correspondence
      const apiIdsShort = apiIdsObj as unknown as MetaTxApiIdsShort[number];
      let tokens = {};
      apiIdsShort.tokens?.map((token) => {
        tokens = {
          ...tokens,
          [token]: apiIdsShort.apiId
        };
      });
      const longFormat: MetaTxApiIdsLong[ConfigId] = {
        protocol: apiIdsShort.apiId,
        ...tokens
      };
      apiIds = JSON.stringify(longFormat) || "";
    } else {
      apiIds = JSON.stringify(apiIdsObj) || "";
    }
  } catch (error) {
    console.error(error);
  }
  return {
    apiKey,
    apiIds
  };
}
