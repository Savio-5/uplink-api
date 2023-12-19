const express = require('express');
const UpstoxClient = require('upstox-js-sdk');

const router = express.Router();
const userApiInstance = new UpstoxClient.UserApi();

router.get('/get-user', (req, res) => {
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

module.exports = router;
