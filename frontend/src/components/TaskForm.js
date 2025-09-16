import React, { useState, useEffect } from 'react';
import API from '../api';

export default function TaskForm({ refresh, editTask, cancelEdit }) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
    } else {
      setTitle('');
    }
  }, [editTask]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (editTask) {
        // Update existing task
        await API.put(`/api/tasks/${editTask._id}`, { title });
        cancelEdit(); // exit edit mode
      } else {
        // Add new task
        await API.post('/api/tasks', { title });
      }
      setTitle('');
      refresh(); // refresh the task list
    } catch (err) {
      console.error('Error submitting task:', err.response?.data || err);
      alert(err.response?.data?.message || 'Failed to perform action');
    }
  };

  return (
    <form onSubmit={submit} className="form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={editTask ? "Edit Task" : "New Task"}
        required
      />
      <button type="submit">{editTask ? "Update" : "Add"}</button>
      {editTask && (
        <button type="button" onClick={cancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}
