import {
  ConfigId,
  EnvironmentType,
  getEnvConfigs
} from "@bosonprotocol/react-kit";

export function getDefaultConfigId(envName: EnvironmentType): ConfigId {
  if (getEnvConfigs(envName).length === 0) {
    throw new Error(`No config found for envNAme '${envName}'`);
  }
  return getEnvConfigs(envName)[0].configId;
}
