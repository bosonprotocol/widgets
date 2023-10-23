[![banner](../assets/banner.png)](https://bosonprotocol.io)

< [Redemption Widget](../redemption-widget.md)

## Default Cancellation Flow

When the Seller website activates the Redemption Widget with the default options, the user is guided through the following steps:

1. Wallet connection (if needed)
   ![Wallet connection](./../assets/redemption-widget/1-wallet-connection.png)
   In case the user wallet is already connected, this step is skipped

2. Redemption Overview
   ![Redemption Overview](./../assets/redemption-widget/2-redemption-overview.png)
   
3. Select Exchange
   ![Select Exchange](./../assets/redemption-widget/3-select-exchange.png)
   
   By default, the Committed exchanges are shown to the user. These are the rNFT owned by the wallet and that the user can cancel.
   
   The user selects an rNFT and clicks it to show the "Exchange Card". Optionally, Cancel button can be directly clicked, which leads the user directly to the Cancel Form

4. Exchange Card
   ![Exchange Card](./../assets/redemption-widget/4-exchange-card.png)
   This view shows details about the exchange, and present a Cancel button (in case the rNFT is cancellable) that the user can click to jump to the Cancel Form

5. Cancel Form
   ![Cancel Form](./../assets/redemption-widget/5-cancel-form.png)
   The user clicks "Confirm cancellation" which sends the CancelExchange transaction on-chain (to be signed/confirmed by the user with their wallet)

   Once the Cancel transaction is confirmed on-chain, the widget goes back to the Exchange Card.

   The user can:
   - close the widget
   - go back to select another rNFT.