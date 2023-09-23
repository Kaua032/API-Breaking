import "dotenv/config";
import app from './app.js'

const PORT = 3500;

app.listen(PORT, () => {
    console.log(`Server On 🟢 ${PORT}`);
  });
  