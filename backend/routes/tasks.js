const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const taskCtrl = require('../controllers/taskController');


router.post('/', auth, taskCtrl.createTask);
router.get('/', auth, taskCtrl.getTasks);
router.put('/:id', auth, taskCtrl.updateTask);
router.delete('/:id', auth, taskCtrl.deleteTask);


module.exports = router;