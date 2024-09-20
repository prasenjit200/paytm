const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const rootRouter = require("./router/index");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
