const express = require('express');
const userRoute = require('./src/routes/user.route');
const PORT = 2000;

const app = express();

app.use(express.json())
app.use('/user', userRoute);

app.listen(PORT, () => {
    console.log(`Server On 🟢 ${PORT}`)
})