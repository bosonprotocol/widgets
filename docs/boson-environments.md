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

The dApps (Marketplace and Dispute Resolution Center) and widgets are able to switch between configurations of the same environment.

The following table recaps all configurations, per environment

<table>
<tr><th>Environment</th><th></th></tr>
<tr><td>production</td><td>
<table>
<tr><th>Configuration</th><th>Blockchain</th><th>Subgraph</th></tr>
<tr><td>production-137-0	</td><td>Polygon</td><td>https://api.thegraph.com/subgraphs/name/bosonprotocol/polygon</td></tr>
<tr><td>production-1-0	</td><td>Ethereum Mainnet</td><td>https://api.thegraph.com/subgraphs/name/bosonprotocol/ethereum</td></tr>
</table>
<table>
<tr><th>dApps</th><th></th></tr>
<tr><td>Marketplace</td><td>https://bosonapp.io</td></tr>
<tr><td>Dispute Resolution Center</td><td>https://disputes.bosonprotocol.io</td></tr>
</table>
<table>
<tr><th>Widgets</th><th></th></tr>
<tr><td>Redemption</td><td>https://widgets.bosonprotocol.io/#/redeem</td></tr>
<tr><td>Finance</td><td>https://widgets.bosonprotocol.io/#/finance</td></tr></table>
</td></tr>
<tr><td>staging</td><td>
<table>
<tr><th>Configuration</th><th>Blockchain</th><th>Subgraph</th></tr>
<tr><td>staging-80002-0	</td><td>Polygon Mumbai (testnet)</td><td>https://api.thegraph.com/subgraphs/name/bosonprotocol/amoy-staging</td></tr>
<tr><td>staging-11155111-0	</td><td>Ethereum Sepolia (testnet)</td><td>https://api.thegraph.com/subgraphs/name/bosonprotocol/sepolia-staging</td></tr>
</table>
<table>
<tr><th>dApps</th><th></th></tr>
<tr><td>Marketplace</td><td>https://interface-staging.on-fleek.app</td></tr>
<tr><td>Dispute Resolution Center</td><td>https://drcenter-staging.on-fleek.app/</td></tr>
</table>
<table>
<tr><th>Widgets</th><th></th></tr>
<tr><td>Redemption</td><td>https://widgets-staging.on-fleek.app/#/redeem</td></tr>
<tr><td>Finance</td><td>https://widgets-staging.on-fleek.app/#/finance</td></tr></table>
</td></tr>
<tr><td>testing</td><td>
<table>
<tr><th>Configuration</th><th>Blockchain</th><th>Subgraph</th></tr>
<tr><td>testing-80002-0</td><td>Polygon Mumbai (testnet)</td><td>https://api.thegraph.com/subgraphs/name/bosonprotocol/amoy-testing</td></tr>
<tr><td>testing-11155111-0	</td><td>Ethereum Sepolia (testnet)</td><td>https://api.thegraph.com/subgraphs/name/bosonprotocol/sepolia-testing</td></tr>
</table>
<table>
<tr><th>dApps</th><th></th></tr>
<tr><td>Marketplace</td><td>https://interface-test.on-fleek.app</td></tr>
<tr><td>Dispute Resolution Center</td><td>https://drcenter-test.on-fleek.app/</td></tr>
</table>
<table>
<tr><th>Widgets</th><th></th></tr>
<tr><td>Redemption</td><td>https://widgets-test.on-fleek.app/#/redeem</td></tr>
<tr><td>Finance</td><td>https://widgets-test.on-fleek.app/#/finance</td></tr></table>
</td></tr>
<tr><td>local</td><td>
<table>
<tr><th>Configuration</th><th>Blockchain</th><th>Subgraph</th></tr>
<tr><td>local-31337-0	</td><td>local (testnet)</td><td>http://localhost:8000/subgraphs/name/boson/corecomponents/graphql</td></tr>
</table>
<table>
<tr><th>dApps</th><th></th></tr>
<tr><td>Marketplace</td><td>http://localhost:3333</td></tr>
<tr><td>Dispute Resolution Center</td><td>http://localhost:3333</td></tr>
</table>
<table>
<tr><th>Widgets</th><th></th></tr>
<tr><td>Redemption</td><td>http://localhost:3000/#/redeem</td></tr>
<tr><td>Finance</td><td>http://localhost:3000/#/finance</td></tr></table>
</td></tr>
</table>
