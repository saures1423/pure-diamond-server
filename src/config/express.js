const express = require('express');
const app = express();
const cors = require('cors');

// Import Router

// brand routes
const brandRoute = require('../routes/brand.route');

// item routes
const itemRoute = require('../routes/item.route');

// enable cors
app.use(cors());
app.options('*', cors());

// parse json request body
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// brand route
app.use('/brand', brandRoute);

// item route
app.use('/item', itemRoute);

module.exports = app;
