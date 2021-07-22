const mongoose = require('mongoose');

const taskPriorities = {
  low: 'low',
  medium: 'medium',
  high: 'high',
};

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
    default: taskPriorities.medium,
    enum: Object.values(taskPriorities),
  },
  done: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = { Task };
