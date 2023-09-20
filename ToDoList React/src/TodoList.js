import React from 'react';
import ReactDOM from 'react-dom';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);

  const handleTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleDeadlineChange = (event) => {
    setNewDeadline(event.target.value);
  };

  const addTask = () => {
    if (newTask !== '') {
      const newTasks = [
        ...tasks,
        { task: newTask, deadline: newDeadline, completed: false },
      ];
      setTasks(newTasks);
      setNewTask('');
      setNewDeadline('');
    }
  };

  const toggleCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const sortByName = () => {
    const sortedTasks = [...tasks].sort((a, b) =>
      a.task.localeCompare(b.task)
    );
    setTasks(sortedTasks);
  };

  const sortByDeadline = () => {
    const sortedTasks = [...tasks].sort((a, b) =>
      a.deadline.localeCompare(b.deadline)
    );
    setTasks(sortedTasks);
  };

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const filterByDay = (day) => {
    const filteredTasks = tasks.filter((task) => task.deadline === day);
    setTasks(filteredTasks);
  };

  const allTasks = showCompleted ? tasks : tasks.filter((task) => !task.completed);

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={handleTaskChange}
          placeholder="Task"
        />
        <input
          type="text"
          value={newDeadline}
          onChange={handleDeadlineChange}
          placeholder="Deadline"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="filters">
        <button onClick={sortByName}>Sort by Name</button>
        <button onClick={sortByDeadline}>Sort by Deadline</button>
        <button onClick={toggleShowCompleted}>
          {showCompleted ? 'Hide Completed' : 'Show Completed'}
        </button>
        <input type="text" placeholder="Filter by Day" onChange={(event) => filterByDay(event.target.value)} />
      </div>
      <ul>
        {allTasks.map((task, index) => (
          <li
            key={index}
            className={task.completed ? 'completed' : ''}
            onClick={() => toggleCompleted(index)}
          >
            <span>{task.task}</span> - <span>{task.deadline}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.render(<TodoList />, document.getElementById('root'));
