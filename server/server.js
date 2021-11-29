const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const discountRoute = require('./discount/routes/discountRoute');

app.use('/discount', discountRoute);
const DEFAULT_PORT = process.env.port || 5000;

app.listen(DEFAULT_PORT, () => {
    console.log('Server is running on port: ' + DEFAULT_PORT);
  });
  