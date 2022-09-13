const Task = require("../models/Tasks");

const getAllTasks = async (req, res) => {
    try {
        const allTask = await Task.find();
        res.status(200).json(allTask);
    } catch (err) {
        res.status(500).json(err);
    }
};

const createTask = async (req, res) => {
    try {
        const createTask = await Task.create(req.body);
        res.status(201).json(createTask);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getSingleTask = async (req, res) => {
    try {
        const getSingleTask = await Task.findOne({ _id: req.params.id }).lean().exec();
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
        const updateTask = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).lean().exec();
        if (!updateTask) {
            return res.status(404).json(`_id: ${req.params.id}は見つかりません。`);
        }
        res.status(200).json(updateTask);
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteTask = async (req, res) => {
    try {
        const deleteTask = await Task.findOneAndDelete({ _id: req.params.id });
        if (!deleteTask) {
            return res.status(404).json(`_id: ${req.params.id}は見つかりません。`);
        }
        res.status(200).json(deleteTask);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
};
