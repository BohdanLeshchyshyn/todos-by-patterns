const express = require('express');
const { Task } = require('../models/Task');
const { requestLoggableProxy } = require('../requestLoggableProxy');

const router = express.Router();

router.get(
  '/api/tasks',
  requestLoggableProxy(async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
  }),
);

router.post(
  '/api/tasks',
  requestLoggableProxy(async (req, res) => {
    const { title, priority } = req.body;
    const task = new Task({ title, priority });
    await task.save();

    res.status(201).send(task);
  }),
);

router.put(
  '/api/tasks',
  requestLoggableProxy(async (req, res) => {
    const { _id, title, done } = req.body;
    const task = await Task.findById(_id);
    task.set({ title, done });

    await task.save();
    res.send(task);
  }),
);

router.delete(
  '/api/tasks/:taskId',
  requestLoggableProxy(async (req, res) => {
    await Task.deleteOne({ _id: req.params.taskId });
    res.status(204).send();
  }),
);

module.exports = {
  taskRouter: router,
};
