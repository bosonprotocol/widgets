[![banner](./assets/banner.png)](https://bosonprotocol.io)

< [Boson Protocol Widgets](../README.md)

# The Redemption Widget 

## Redeeming rNFTs using the Boson Widget

With the release of the Boson Redemption Widget, Sellers can now offer redemption of their rNFTs on their own domains.

Sellers can chose to sell their rNFTs everywhere in the metaverse, in game, on NFT marketplaces, or from the Boson dApp whilst bringing users back to their own domain to redeem their NFTs. 

The Boson Redemption Widget allows Sellers to simply embed, via a few lines of code, redemption functionality of their rNFTs into an existing website. 

![Redemption Widget steps](./assets/redemption-widget/redemption_widget_1.png)


To integrate the Boson Redemption Widget, all a seller needs to do is:

 1. Add the following `<script>` entry, either in `<head>` or `<body>` of their website:
```
<script async type="text/javascript" src="https://widgets.bosonprotocol.io/scripts/boson-widgets.js"></script>
```

 2. The Seller then needs to create a button with the fragment identifier *id="boson-redeem"*. When clicked, the redeem modal will popup on the Seller's website.
``` 
<button type="button" id="boson-redeem" data-config-id="production-137-0">Show Redeem</button>
```

The ```data-config-id``` parameter specifies the Boson Configuration addressed by the widget (here ***production-137-0*** is the production configuration deployed on the Polygon blockchain). See [Boson Environment](./boson-environments.md) to get more details.

![Redemption Widget Items View](./assets/redemption-widget/redemption_widget_2.png)

## Using the Boson Redemption Button

As a seller you can also choose to use the Boson branded "Redeem" Button on your website, if you would like to do this, all you need to do is: 

 1. Add the below 2 lines of code in HTML `<head>` section:
```
 <head>
    ...
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://widgets.bosonprotocol.io/styles.css">
  </head>
```

2. Add the below class name to the "boson-redeem" button:
```
<button type="button" id="boson-redeem" class="bosonButton" data-config-id="production-137-0">Show Redeem</button>
```

![Boson Redeem Button](./assets/redemption-widget/redeem.png)



### Redeeming specific rNFTs

#### A specific rNFT

The Boson Widget's default behaviour is to show a buyer all of their redeemable vouchers. However, the widget can be configured to direct a buyer to a given rNFT for redemption, this enables different user flows. This the way that the Widget is used on [the Boson dApp](https://bosonapp.io/). 

A Seller can specify which exchange is going to be redeemed by the widget, by adding a *data-exchange-id* tag to the "boson-redeem" button, specifying the exchangeId of a given exchange:
```
<button type="button" id="boson-redeem" data-config-id="production-137-0" data-exchange-id="80">Redeem Exchange 80</button>
```

You can find an example HTML file which embeds the widgets on the the widgets subdomain : https://widgets.bosonprotocol.io/example.html

#### rNFTs for a/some specific seller(s)

The widget can also be configured to show only the rNFTs emitted by some specific Boson Seller Accounts (typically the seller account the redemption site is referring to).

To add a Seller filter to the redemption widget, add a *data-seller-ids* tag to the "boson-redeem" button, specifying the list of Boson Seller accounts you're addressing to:
```
<button type="button" id="boson-redeem" data-config-id="production-137-0" data-seller-ids="26,110,138">Redeem Exchange</button>
```

### Integrating the Redemption Widget as an iFrame

Instead of using the Redeem Button as shown above, the redemption widget can be embedded in any web page using an iFrame HTML tag.

For instance:
```
<iframe src="https://widgets.bosonprotocol.io/#/redeem?configId=production-137-0"></iframe>
```

In which case the page:
- does not need to include any specific line (like the ```<script>``` tag for ```boson-widgets.js```)
- shall manage itself the logic to show and hide the iFrame, and the parameters to pass to its URL.

### Redemption Widget Parameters

The following parameters configures the widget. They must be passed in the widget URL (for instance when building an iFrame).
For instance:
```
<iframe src="https://widgets.bosonprotocol.io/#/redeem?sellerIds=26,110,138&configId=production-137-0"></iframe>
```

When using the Redeem Button, as shown above, the parameters must be passed as HTML attributes to the Button tag. For instance:
```
<button class="bosonButton" id="boson-redeem-button" data-config-id="production-137-0" data-seller-ids="26,110,138">Show Redeem</button>
```


| URL parameter | HTML attribute | Required | Default Value | Purpose | Example |
| ------ | -------- | ------- | ------- | ------- | ------- |
| configId | data-config-id | yes | none | the Boson Protocol environment the widget is linked to (see [Boson Environments](../boson-environments.md)) | ```"production-137-0"```
| account | data-account | no | none | the address of the wallet the widget should accept. When specified, the user can't connect any other wallet that the one specified | ```"0x023456789abcd0213456789abcd213456789abcd"```
| widgetAction | data-widget-action | no | "SELECT_EXCHANGE" | the action the widget is going to jump on (SELECT_EXCHANGE, EXCHANGE_DETAILS, REDEEM_FORM, CANCEL_FORM or CONFIRM_REDEEM) | ```"REDEEM_FORM"```
| exchangeId | data-exchange-id | no | none | The ID of the exchange being redeemed (or cancelled). Relevant when used with widgetAction **different** than SELECT_EXCHANGE. | ```"123"```
| sellerIds | data-seller-ids | no | none | Specifies the list of sellerIds to filter the exchanges shown to the user. Relevant when widgetAction is SELECT_EXCHANGE. | ```"46,78,90"```
| exchangeState | data-exchange-state | no | "Committed" | State of the exchanges when shown in the Select Exchange step. Relevant when widgetAction is SELECT_EXCHANGE. | ```"Redeemed"```
| showRedemptionOverview | data-show-redemption-overview | no | true | set to 'false' to skip the Redemption Overview (first step in the [user flow](./redemption-widget/default-redemption-flow.md)) | ```false```
| deliveryInfo | data-delivery-info | no | none | specify the delivery details that shall prefill the Redeem form, or be recapped on Confirm Redeem step. | ```'{"name":"TITI","streetNameAndNumber":"1 grand place","city":"LILLE","state":"NORD","zip":"59000","country":"FR","email":"toto@mail.com","phone":"+33123456789"}'```
| sendDeliveryInfoThroughXMTP | data-send-delivery-info-XMTP | yes | none | whether the widget should send the delivery information to the seller via XMTP | `true`
| targetOrigin | data-target-origin | no | none | If set, the widget will send frontend messages (`boson-delivery-info`, `boson-redemption-submitted` and `boson-redemption-confirmed`) to this origin when appropriate | `"https://myshop.com"`
| shouldWaitForResponse | data-wait-for-response | no | none | whether the widget should wait for a response (`boson-delivery-info-response`) to the deliveryInfo message (`boson-delivery-info`). If false, the widget does not wait and progress further with the redemption flow | `false`
| postDeliveryInfoUrl | data-post-delivery-info-url | no  | none | this is the URL to which the widget will post the ***DeliveryInfo*** HTTP request with the delivery Details (see [Redemption with 3rd party eCommerce backend](./redemption-widget/backend-redemption-flow.md)) | ```"https://myshop.com/deliveryInfo"```
| postDeliveryInfoHeaders | data-post-delivery-info-headers | no | none | optionally specifies some request headers that must be added to the ***DeliveryInfo*** HTTP request | ```'{"authorization":"Bearer eyJhbGciOiJIUzL1Ni2sInR5cCI6IkpXVCJ7","another-header":"*****"}'```
| postRedemptionSubmittedUrl | data-post-redemption-submitted-url | no | none | this is the URL to which the widget will post the ***RedemptionSubmitted*** HTTP request with the delivery Details | ```"https://myshop.com/redemptionSubmitted"```
| postRedemptionSubmittedHeaders | data-post-redemption-submitted-headers | no | none | optionally specifies some request headers that must be added to the ***RedemptionSubmitted*** HTTP request | ```'{"authorization":"Bearer eyJhbGciOiJIUzL1Ni2sInR5cCI6IkpXVCJ7","another-header":"*****"}'```
| postRedemptionConfirmedUrl | data-post-redemption-confirmed-url | no | none | this is the URL to which the widget will post the ***RedemptionConfirmed*** HTTP request with the delivery Details | ```"https://myshop.com/redemptionConfirmed"```
| postRedemptionConfirmedHeaders | data-post-redemption-confirmed-headers | no | none | optionally specifies some request headers that must be added to the ***RedemptionConfirmed*** HTTP request | ```'{"authorization":"Bearer eyJhbGciOiJIUzL1Ni2sInR5cCI6IkpXVCJ7","another-header":"*****"}'```


### Advanced Redemption Flows

Hereafter are detailed examples of the redemption flows supported by the widget.

- [Default redemption flow](./redemption-widget/default-redemption-flow.md)
- [Marketplace redemption flow](./redemption-widget/marketplace-redemption-flow.md)
- [Redemption with 3rd party eCommerce backend](./redemption-widget/backend-redemption-flow.md)
- [Redemption with frontend messaging](./redemption-widget/frontend-redemption-flow.md)

The redemption widget can also support other usecases:
- [Default cancellation flow](./redemption-widget/default-cancellation-flow.md)
- [Marketplace cancellation flow](./redemption-widget/marketplace-cancellation-flow.md)
- [Raise a dispute on a redeemed exchange](./redemption-widget/raise-dispute-flow.md)

