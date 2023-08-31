const express = require('express');
const userRoute = require('./src/routes/user.route');
const connectDatabase = require('./src/database/db')
const PORT = 2000;

const app = express();

connectDatabase();
app.use(express.json())
app.use('/user', userRoute);

app.listen(PORT, () => {
    console.log(`Server On 🟢 ${PORT}`)
})