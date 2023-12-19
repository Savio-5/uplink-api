const UpstoxClient = require('upstox-js-sdk');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs')

app.set('views', __dirname + '/views');

const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const orderController = require('./controllers/orderController');

let defaultClient = UpstoxClient.ApiClient.instance;
let OAUTH2 = defaultClient.authentications['OAUTH2'];
OAUTH2.accessToken = process.env.ACCESS_TOKEN;

app.use('/api', authController);
app.use('/api/user', userController);
app.use('/api/order', orderController);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});