const express = require('express');
const UpstoxClient = require('upstox-js-sdk');

const router = express.Router();
const loginApiInstance = new UpstoxClient.LoginApi();

router.get('/authorize', (req, res) => {
    res.render('index', {
        clientId: process.env.CLIENT_ID,
        redirectUri: "http://localhost:8090/api/dashboard",
        apiVersion: "2.0",
        state: "state_example",
      });
});

router.get('/dashboard', (req, res) => {
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

module.exports = router;
