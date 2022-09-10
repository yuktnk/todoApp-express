const Task = require("../models/Tasks");

const getAllTasks = async (req, res) => {
    try {
        const allTask = await Task.find({});
        res.status(200).json(allTask);
    } catch (err) {
        res.status(500).json(err);
    }
};

const createTask = async (req, res) => {
    try {
        const createTask = await Task.create(req.body);
        res.status(200).json(createTask);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSingleTask = async (req, res) => {
    try {
        const getSingleTask = await Task.findOne({ _id: req.params.id });
        if (!getSingleTask) {
            return res.status(404).json(`_id: ${req.params.id}は見つかりません。`);
        }
        res.status(200).json(getSingleTask);
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateTask = async (req, res) => {
    try {
        const updateTaks = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (!updateTaks) {
            return res.status(404).json(`_id: ${req.params.id}は見つかりません。`);
        }
        res.status(200).json(updateTaks);
    } catch (err) {
        res.status(500).json(err);
    }
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
