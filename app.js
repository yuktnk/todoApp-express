const express = require("express");
const app = express();
const tasksRoute = require("./routes/tasks");
const PORT = 3000;
const connectDB = require("./db/connect");
require("dotenv").config();
app.use(express.json());

// ルーティング設定
app.use("/api/v1/tasks", tasksRoute);

// DBと接続、ローカルサーバー起動
const start = async () => {
    try {
        connectDB(process.env.MONGO_URL);
        app.listen(PORT, console.log("ローカルサーバー起動"));
    } catch (err) {
        console.log(err);
    }
};
start();
