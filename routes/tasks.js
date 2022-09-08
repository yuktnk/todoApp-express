const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("タスクを全て取得");
});

router.post("/", (req, res) => {
    res.send("タスクを新規作成しました");
});

router.get("/:id", (req, res) => {
    res.send("特定のタスクを取得しました");
});

router.patch("/:id", (req, res) => {
    res.send("特定のタスクを更新しました");
});

router.delete("/:id", (req, res) => {
    res.send("特定のタスクを削除しました");
});

module.exports = router;
