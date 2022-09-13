const express = require("express");
const app = express();
const tasksRoute = require("./routes/tasks");
const PORT = process.env.PORT || 3000;
const connectDB = require("./db/connect");
require("dotenv").config();
app.use(express.json());
app.use(express.static("./public"));

// ルーティング設定
app.use("/api/v1/tasks", tasksRoute);

// DBと接続、ローカルサーバー起動
const start = async () => {
    try {
        await connectDB(process.env.MONGO_HEROKU_URL || process.env.MONGO_URL);
        app.listen(PORT, console.log("サーバー起動"));
    } catch (err) {
        console.log(err);
    }
};
start();
