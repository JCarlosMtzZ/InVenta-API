const express = require('express');
const sequelize = require('./config/db.js');

const app = express();

app.use(express.json());

sequelize.authenticate();
