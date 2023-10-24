[![banner](../assets/banner.png)](https://bosonprotocol.io)

< [Redemption Widget](../redemption-widget.md)

## Default Redemption Flow

When the Seller website activate the Redemption Widget with the default options, the user is guided through the following steps:

1. Wallet connection (if needed)
   ![Wallet connection](./../assets/redemption-widget/1-wallet-connection.png)
   In case the user wallet is already connected, this step is skipped

2. Redemption Overview
   ![Redemption Overview](./../assets/redemption-widget/2-redemption-overview.png)
   
3. Select Exchange
   ![Select Exchange](./../assets/redemption-widget/3-select-exchange.png)
   
   By default, the Committed exchanges are shown to the user. These are the rNFT owned by the wallet and that the user can redeem.
   
   The user selects an rNFT and clicks it to show the "Exchange Card". Optionally, the Redeem button can be directly clicked, which leads the user directly to the Redeem Form

4. Exchange Card
   ![Exchange Card](./../assets/redemption-widget/4-exchange-card.png)
   This view shows details about the exchange, and presents a Redeem button (in case the rNFT is redeemable) that the user can click to jump to the Redeem Form

5. Redeem Form
   ![Redeem Form](./../assets/redemption-widget/5-redeem-form.png)
   The user fills in the delivery details to get their physical item delivered

6. Redeem Confirmation
   ![Redeem Confirmation](./../assets/redemption-widget/6-redeem-confirmation.png)
   The user needs to Initialize the Chat layer (signing a message with their wallet) to allow the delivery information to be sent to the Seller. [XMTP](https://xmtp.org/) is used as a chat layer, insuring decentralization and privacy of Buyer/Seller communication.

   Once the Chat is Initialized, the user clicks "Confirm address and redeem", which:
   - sends the delivery details to the Seller (via XMTP)
   - sends the Redeem transaction on-chain (to be signed/confirmed by the user with their wallet)

7. Congratulations
   ![Congratulations](./../assets/redemption-widget/7-congratulations.png)
   Once the Redeem transaction is confirmed on-chain, a congratulation message is shown to the user.

   The user can:
   - close the widget
   - go back to select another rNFT.