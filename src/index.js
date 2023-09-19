import express from "express";
import connectDatabase from "./database/db.js";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import newsRoute from "./routes/news.route.js";
import swaggerRoute from "./routes/swagger.route.cjs";

const PORT = 3500;
const app = express();

connectDatabase();
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/news", newsRoute);
app.use("/doc", swaggerRoute );

app.listen(PORT, () => {
  console.log(`Server On 🟢 ${PORT}`);
});
