class LowPriorityTask {
  constructor({ _id, title }) {
    this._id = _id;
    this.title = title;
  }

  get id() { return this._id; }

  getObjectCopy() {
    return {
      _id: this._id,
      title: this.title,
      priority: 'low',
    };
  }

  render() {
    return (
      <span className="task">
        <span className="priority-circle" style={{ backgroundColor: 'green' }} />
        <span className="text">{this.title}</span>
      </span>
    );
  }
}

class MediumPriorityTask {
  constructor({ _id, title }) {
    this._id = _id;
    this.title = title;
  }

  get id() { return this._id; }

  getObjectCopy() {
    return {
      _id: this._id,
      title: this.title,
      priority: 'medium',
    };
  }

  render() {
    return (
      <span className="task">
        <span className="priority-circle" style={{ backgroundColor: 'orange' }} />
        <span className="text">{this.title}</span>
      </span>
    );
  }
}

class HighPriorityTask {
  constructor({ _id, title }) {
    this._id = _id;
    this.title = title;
  }

  get id() { return this._id; }

  getObjectCopy() {
    return {
      _id: this._id,
      title: this.title,
      priority: 'high',
    };
  }

  render() {
    return (
      <span className="task">
        <span className="priority-circle" style={{ backgroundColor: 'red' }} />
        <span className="text">{this.title}</span>
      </span>
    );
  }
}

class FinishedTask {
  constructor(task) {
    this.task = task;
  }

  get id() { return this.task.id; }
  get finished() { return true; }

  getObjectCopy() {
    return { ...this.task.getObjectCopy(), done: true };
  }

  render() {
    return <span className="finished-task">{this.task.render()}</span>;
  }
}

class TaskFactory {
  static taskTypes = {
    low: LowPriorityTask,
    medium: MediumPriorityTask,
    high: HighPriorityTask,
  };

  static newTask({ _id, title, priority: type = 'medium', done = false }) {
    const TaskType = TaskFactory.taskTypes[type] ?? TaskFactory.taskTypes.medium;
    const Task = new TaskType({ _id, title });
    return done ? new FinishedTask(Task) : Task;
  }
}

export default TaskFactory;
