import axios from 'axios';
import TaskFactory from './TaskFactory';

class TaskManager {
  constructor() {
    const instance = TaskManager.instance;
    if (instance) return instance;

    TaskManager.instance = this;
    this.tasksCache = [];
  }

  async getTasks() {
    const { data = [] } = await axios.get(`http://localhost:3001/api/tasks`);
    this.tasksCache = data.map(TaskFactory.newTask);

    return this.tasksCache;
  }

  async addTask(task) {
    const { data } = await axios.post('http://localhost:3001/api/tasks', task);
    this.tasksCache.push(TaskFactory.newTask(data));

    return this.tasksCache;
  }

  async editTask(task) {
    const { data } = await axios.put('http://localhost:3001/api/tasks', task);
    this.tasksCache = this.tasksCache.map((t) =>
      t.id === data._id ? TaskFactory.newTask(data) : t,
    );

    return this.tasksCache;
  }

  async deleteTask(task) {
    await axios.delete(`http://localhost:3001/api/tasks/${task._id}`);
    this.tasksCache = this.tasksCache.filter((t) => t.id !== task._id);

    return this.tasksCache;
  }
}

export default TaskManager;
