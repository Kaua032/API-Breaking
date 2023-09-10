import express from 'express';
import connectDatabase from './src/database/db.js';

import userRoute from './src/routes/user.route.js';
import authRoute from './src/routes/auth.route.js';

const PORT = 3500;
const app = express();

connectDatabase();
app.use(express.json());
app.use('/user', userRoute);
app.use('/auth', authRoute);

app.listen(PORT, () => {
    console.log(`Server On 🟢 ${PORT}`);
});