const express = require("express");
const app = express();
const tasksRoute = require("./routes/tasks");
const PORT = 3000;

app.use("/api/v1/tasks", tasksRoute);

app.listen(PORT, console.log("ローカルサーバー起動"));
