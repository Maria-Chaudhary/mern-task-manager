import React, { useState, useEffect } from 'react';
import API from '../api';

export default function TaskForm({ refresh, editTask, cancelEdit }) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
    }
  }, [editTask]);

  const submit = async (e) => {
    e.preventDefault();
    if (editTask) {
      // Update task
      await API.put(`/api/tasks/${editTask._id}`, { title });
      cancelEdit(); // close edit mode
    } else {
      // Add new task
      await API.post('/api/tasks', { title });
    }
    setTitle('');
    refresh();
  };

  return (
    <form onSubmit={submit} className="form">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder={editTask ? "Edit Task" : "New Task"}
        required
      />
      <button type="submit">{editTask ? "Update" : "Add"}</button>
      {editTask && <button type="button" onClick={cancelEdit}>Cancel</button>}
    </form>
  );
}
