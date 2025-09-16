import React, { useEffect, useState } from 'react';
import API from '../api';
import TaskForm from './TaskForm';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [error, setError] = useState('');

  // Fetch tasks from backend
  const getTasks = async () => {
    setError('');
    try {
      const res = await API.get('/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err.response?.data || err);
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    }
  };

  // Delete a task with confirmation
  const deleteTask = async (id) => {
    setError('');
    const confirm = window.confirm('Are you sure you want to delete this task?');
    if (!confirm) return;

    try {
      await API.delete(`/api/tasks/${id}`);
      getTasks(); // refresh tasks
    } catch (err) {
      console.error('Error deleting task:', err.response?.data || err);
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <h2>Your Tasks</h2>
      {error && <p className="error">{error}</p>}

      {/* TaskForm for adding or editing */}
      <TaskForm
        refresh={getTasks}
        editTask={editTask}
        cancelEdit={() => setEditTask(null)}
      />

      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            <span>{t.title}</span>
            <div>
              <button onClick={() => setEditTask(t)}>Edit</button>
              <button onClick={() => deleteTask(t._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
