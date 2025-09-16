const Task = require('../models/Task');


exports.createTask = async (req, res) => {
try {
const { title, description } = req.body;
const task = new Task({ title, description, user: req.user.id });
await task.save();
res.json(task);
} catch (err) {
console.error(err.message);
res.status(500).send('Server error');
}
};


exports.getTasks = async (req, res) => {
try {
const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
res.json(tasks);
} catch (err) {
console.error(err.message);
res.status(500).send('Server error');
}
};


exports.updateTask = async (req, res) => {
try {
const { title, description, completed } = req.body;
const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
if (!task) return res.status(404).json({ message: 'Task not found' });


task.title = title ?? task.title;
task.description = description ?? task.description;
if (typeof completed !== 'undefined') task.completed = completed;


await task.save();
res.json(task);
} catch (err) {
console.error(err.message);
res.status(500).send('Server error');
}
};


exports.deleteTask = async (req, res) => {
try {
const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
if (!task) return res.status(404).json({ message: 'Task not found' });
res.json({ message: 'Task removed' });
} catch (err) {
console.error(err.message);
res.status(500).send('Server error');
}
};