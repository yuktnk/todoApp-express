const getAllTasks = (req, res) => {
    res.send("タスクを全て取得");
};

const createTask = (req, res) => {
    res.send("タスクを新規作成しました");
};

const getSingleTask = (req, res) => {
    res.send("特定のタスクを取得しました");
};

const updateTask = (req, res) => {
    res.send("特定のタスクを更新しました");
};

const deleteTask = (req, res) => {
    res.send("特定のタスクを削除しました");
};

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
};
