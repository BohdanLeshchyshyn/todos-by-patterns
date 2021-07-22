import React from 'react';

import TaskInput from './components/TaskInput';
import TaskManager from './TaskManager';

class App extends React.Component {
  constructor() {
    super();
    this.taskManager = new TaskManager();
    this.state = { tasks: [] };
  }

  componentDidMount() {
    this.taskManager.getTasks().then((tasks) => this.setState({ tasks }));
  }

  createTask = (task) => {
    this.taskManager.addTask(task).then((tasks) => this.setState({ tasks }));
  };

  editTask = (task) => {
    this.taskManager.editTask(task).then((tasks) => this.setState({ tasks }));
  };

  deleteTask = (task) => {
    this.taskManager.deleteTask(task).then((tasks) => this.setState({ tasks }));
  };

  render() {
    const { tasks } = this.state;
    return (
      <div className="landing-page">
        <div className="tasks-wrapper">
          <div className="top">Todos</div>

          {tasks.map((task) => (
            <div key={task.id} className="task-line">
              {task.render()}
              <span className="task-options">
                <span
                  className="opt"
                  onClick={() => this.deleteTask(task.getObjectCopy())}
                >
                  ❌
                </span>
                <img
                  onClick={() => this.createTask({ ...task.getObjectCopy(), done: false })}
                  className="opt"
                  style={{ width: '18px' }}
                  alt="copy task"
                  src='copy.svg'
                />
                {!task?.finished
                  ? (
                    <span
                      className="opt"
                      onClick={() => this.editTask({ ...task.getObjectCopy(), done: true })}
                    >
                      ✔️
                    </span>
                  )
                  : (
                    <img
                      onClick={() => this.editTask({ ...task.getObjectCopy(), done: false })}
                      className="opt"
                      style={{ width: '18px' }}
                      alt="undo task"
                      src='undo.svg'
                    />
                  )
                }
              </span>
            </div>
          ))}
          
          <TaskInput addTask={this.createTask}></TaskInput>
        </div>
      </div>
    );
  }
}

export default App;
