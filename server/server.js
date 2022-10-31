const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./dev.env" });

mongoose
  .connect(process.env.DATABASE_URL)
  .then((connect) => console.log("Successfullt connect to mongoDB"))
  .catch((error) => console.log(error));

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server running on port http://localhost:${port} 🔥`)
);
