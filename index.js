const UpstoxClient = require('upstox-js-sdk');
const expressWs = require('express-ws');
const express = require('express');
const axios = require('axios');

const app = express();
expressWs(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs')

app.set('views', __dirname + '/views');

// Oauth2
let defaultClient = UpstoxClient.ApiClient.instance;
let OAUTH2 = defaultClient.authentications['OAUTH2'];
OAUTH2.accessToken = process.env.ACCESS_TOKEN;
// End Oauth2

// UpstoxClient instances
const loginApiInstance = new UpstoxClient.LoginApi();
const userApiInstance = new UpstoxClient.UserApi();
const orderApiInstance = new UpstoxClient.OrderApi();


app.get('/api/authorize', (req, res) => {
  res.render('index', {
    clientId: process.env.CLIENT_ID,
    redirectUri: "http://localhost:8090/api/dashboard",
    apiVersion: "2.0",
    state: "state_example",
  });
});

app.get('/api/dashboard', (req, res) => {
  const code = req.query.code;

  let apiVersion = "2.0"; // String | API Version Header
  let opts = {
    'code': code, // String | 
    'clientId': process.env.CLIENT_ID, // String | 
    'clientSecret': process.env.API_SECRET, // String | 
    'redirectUri': "http://localhost:8090/api/dashboard", // String | 
    'grantType': "authorization_code" // String | 
  };
  loginApiInstance.token(apiVersion, opts, (error, data, response) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).json(data);
    }
  });
});

app.get('/api/get-user', (req, res) => {
  let apiVersion = "2.0"; // String | API Version Header

  userApiInstance.getProfile(apiVersion, (error, data, response) => {
    if (error) {
      // console.error(error);
      res.status(401).json(error);
    } else {
      // console.log(data);
      res.status(200).json(data);
    }
  });
});

// Orders

app.post('/api/place-order', (req, res) => {
  const order_data = req.body;

  if (order_data === undefined || order_data === null) {
    res.status(403).json({ error: "Missing the required parameter 'body' when calling placeOrder" });
  }

  let apiVersion = "2.0"; // String | API Version Header
  let data = order_data;

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

app.delete('/api/cancel-order', (req, res) => {
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

app.get('/api/get-order-details', (req, res) => {
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

app.get('/api/get-order-history', (req, res) => {
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

app.get('/api/get-trades-for-day', (req, res) => {
  let apiVersion = "2.0"; // String | API Version Header
  orderApiInstance.getTradeHistory(apiVersion, (error, data, response) => {
    if (error) {
      res.status(401).json(error);
    } else {
      res.status(200).json(data);
    }
  });
});

// End orders

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});