// const UpstoxClient = require('upstox-js-sdk');
// // Oauth2
// let defaultClient = UpstoxClient.ApiClient.instance;
// let OAUTH2 = defaultClient.authentications['OAUTH2'];
// OAUTH2.accessToken = process.env.ACCESS_TOKEN;
// // End Oauth2

// const orderApiInstance = new UpstoxClient.OrderApi();

// let apiVersion = "2.0"; // String | API Version Header
//   let data = {
//     quantity: 15,
//     product: "I",
//     validity: "DAY",
//     price: 0,
//     instrument_token: "NSE_FO|40807",
//     order_type: "MARKET",
//     transaction_type: "BUY",
//     disclosed_quantity: 0,
//     trigger_price: 0,
//     is_amo: false
//     }

//   orderApiInstance.placeOrder(data, apiVersion, (error, data, response) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(data);
//     }
//   });


const axios = require('axios');

let order_data = {
    quantity: 15,
    product: "I",
    validity: "DAY",
    price: 0,
    instrument_token: "NSE_FO|40807",
    order_type: "MARKET",
    transaction_type: "BUY",
    disclosed_quantity: 0,
    trigger_price: 0,
    is_amo: false
}

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.upstox.com/v2/order/place',
    headers: {
        'Api-Version': '2.0',
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    data: order_data
};

axios(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });
    