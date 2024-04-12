const express = require('express');
const mongoose = require('mongoose');
const CookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const app = require('./app');

mongoose.connect(process.env.MONGO_URL);

const PORT = process.env.PORT || 4000;

app.listen(4000, () => console.log(`listening to port ${PORT}`));