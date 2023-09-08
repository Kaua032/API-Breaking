import express from 'express';
import connectDatabase from './src/database/db.js';
import userRoute from './src/routes/user.route.js';

const PORT = 2000;
const app = express();

connectDatabase();
app.use(express.json());

app.use('/user', userRoute);

app.listen(PORT, () => {
    console.log(`Server On 🟢 ${PORT}`);
});