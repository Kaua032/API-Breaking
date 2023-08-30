const express = require('express');
const userRoute = require('./src/routes/user.route');

const app = express();

app.use('', userRoute);

app.listen(2000)