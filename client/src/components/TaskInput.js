import React from 'react';

class TaskInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: '', priority: 'medium'};
  }

  addTask = () => {
    const { title, priority } = this.state;
    if (title) {
      this.props.addTask({ title, priority });
      this.setState({ title: '', priority: 'medium' });
    }
  };

  titleChange = e => this.setState({ title: e.target.value });

  priorityChange = e => this.setState({ priority: e.target.value });

  render() {
    const { title, priority } = this.state;

    return (
      <div className="task-input">
        <input onChange={this.titleChange} value={title}></input>

        <select id="priority" name="priority" value={priority} onChange={this.priorityChange}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <button onClick={this.addTask}>ADD</button>
      </div>
    );
  }
}

export default TaskInput;
