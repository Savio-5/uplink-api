const express = require('express');
const UpstoxClient = require('upstox-js-sdk');
const axios = require('axios');

const router = express.Router();
const orderApiInstance = new UpstoxClient.OrderApi();

router.post('/place-order', (req, res) => {
    const order_data = req.body;

    if (order_data === undefined || order_data === null) {
      res.status(403).json({ error: "Missing the required parameter 'body' when calling placeOrder" });
    }
  
    let apiVersion = "2.0"; // String | API Version Header
    let data = order_data;
  
    // I have fixed the sdk. Thats why it's working.
    orderApiInstance.placeOrder(data, apiVersion, (error, data, response) => {
      if (error) {
        console.log(error);
        res.status(401).json(error);
      } else {
        console.log(data);
        res.status(200).json(data);
      }
    });
});

router.delete('/cancel-order', (req, res) => {
    const order_id = req.query.order_id;

    if (order_id === undefined || order_id === null) {
      res.status(403).json({ error: "Missing the required parameter 'order_id' when calling Order" });
    }
  
    let orderId = order_id; // String | The order ID for which the order must be cancelled
    let apiVersion = "2.0"; // String | API Version Header
  
    orderApiInstance.cancelOrder(orderId, apiVersion, (error, data, response) => {
      if (error) {
        res.status(401).json(error);
      } else {
        res.status(200).json(data);
      }
    });
});

router.get('/get-order-details', (req, res) => {
    const order_id = req.query.order_id;

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.upstox.com/v2/order/details',
      headers: {
        'Api-Version': '2.0',
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      params: {
        'order_id': order_id,
      }
    };
  
    axios(config)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((error) => {
        res.json(error);
      });
});

router.get('/get-order-history', (req, res) => {
    const order_id = req.query.order_id;
    const tag = req.query.tag;
  
    let opts = {
      'order_id': order_id || null, // String |
      'tag': tag || null // String |
    };
  
    let apiVersion = "2.0"; // String | API Version Header
    orderApiInstance.getOrderDetails(apiVersion, opts, (error, data, response) => {
      if (error) {
        res.status(401).json(error);
      } else {
        res.status(200).json(data);
      }
    });
});

router.get('/retrieve-all', (req, res) => {
    let apiVersion = "2.0"; // String | API Version Header
    orderApiInstance.getOrderBook(apiVersion, (error, data, response) => {
      if (error) {
        res.status(401).json(error);
      } else {
        res.status(200).json(data);
      }
    });
});

router.get('/get-trades-for-day', (req, res) => {
    let apiVersion = "2.0"; // String | API Version Header
    orderApiInstance.getTradeHistory(apiVersion, (error, data, response) => {
      if (error) {
        res.status(401).json(error);
      } else {
        res.status(200).json(data);
      }
    });
});

module.exports = router;