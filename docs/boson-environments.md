[![banner](./assets/banner.png)](https://bosonprotocol.io)

< [Boson Protocol Widgets](../README.md)

## Boson Protocol Environment

Boson Protocol is deployed onto 3 public **environments**, to be used in different contexts, for different reasons and probably by different users:
 - ***testing*** is a development environment, very unstable by nature. Unless you're developing on Boson Protocol Components, you shouldn't use this environment.
 - ***staging*** is a validation environment, on testnet blockchain, specifically designed to test and discover the Boson Protocol Components without being on a real blockchain.
 - ***production*** is the production environment. Everything processed on this environment is **FOR REAL**.

In addition, it's possible to deploy your own environment on your local machine. We call it the ***local*** environment.

## Boson Protocol Configurations

Each environment (except ***local***) is currently deployed on several configurations, corresponding to different blockchains.

The following table recaps all configurations, per environment

| environment | configuration | blockchain | subgraph |
| ----------- | ------------- | ---------- | -------- | 
| local | local-31337-0 | local (testnet) | http://localhost:8000/subgraphs/name/boson/corecomponents/graphql
| testing | testing-80001-0 | Polygon Mumbai (testnet) | https://api.thegraph.com/subgraphs/name/bosonprotocol/mumbai-testing
| testing | testing-5-0 | Ethereum Goerli (testnet) | https://api.thegraph.com/subgraphs/name/bosonprotocol/goerli-testing
| staging | staging-80001-0 | Polygon Mumbai (testnet) | https://api.thegraph.com/subgraphs/name/bosonprotocol/mumbai-staging
| staging | staging-5-0 | Polygon Mumbai (testnet) | https://api.thegraph.com/subgraphs/name/bosonprotocol/goerli-staging
| production | production-137-0 | Polygon | https://api.thegraph.com/subgraphs/name/bosonprotocol/polygon
| production | production-1-0 | Ethereum Mainnet | https://api.thegraph.com/subgraphs/name/bosonprotocol/ethereum
