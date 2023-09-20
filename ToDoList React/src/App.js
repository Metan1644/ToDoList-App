import React, { useState } from 'react';

function TodoList() {
  // set variables and function to update them
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [deadline, setDeadline] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const [sortBy, setSortBy] = useState('');


  const addTask = () => {
    //  checks if both newTask and deadline 
    // are not empty strings when trimmed using the trim() method.
    if (newTask.trim() !== '' && deadline.trim() !== '') {
      const task = {
        id: Date.now(),
        name: newTask,
        deadline: deadline
      };
      // creates a new array that contains all 
      // the original tasks and add new task
      setTasks([...tasks, task]);
      setNewTask('');
      setDeadline('');
    }
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) => {
      // Update task's stauts to completed
      if (task.id === id) {
        return { ...task, 
          completed:! task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    // iterates over each element and keep elements that matches
    const updatedTasks = tasks.filter((task) => task.id !== id);
    // updates the tasks state variable with the new filtered array.
    setTasks(updatedTasks);
  };

  const toggleVisibility = () => {
    setShowCompleted(!showCompleted);
  };

  const sortTasksByName = () => {
    setSortBy('name');
    // Performs sorting
    const sortedTasks = [...tasks].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setTasks(sortedTasks);
  };

  const sortTasksByDeadline = () => {
    setSortBy('deadline');
    const sortedTasks = [...tasks].sort((a, b) =>
      a.deadline.localeCompare(b.deadline)
    );
    setTasks(sortedTasks);
  };

  const filteredTasks = showCompleted ? tasks : tasks.filter((task) => !task.completed);

  return (
    <div>
      <h1>Todo List App</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Task name"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={toggleVisibility}
          />
          Show Completed
        </label>
      </div>
      <div>
        <button onClick={sortTasksByName}>Sort by Name</button>
        <button onClick={sortTasksByDeadline}>Sort by Deadline</button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            {task.name} - Deadline: {task.deadline}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>

    </div>

  );
}

export default TodoList;
