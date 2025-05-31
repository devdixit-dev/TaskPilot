import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  taskDesc: { type: String, required: true },
  taskCreatedBy: { type: String, required: true },
  taskForEmployee: { type: String, required: true },
  taskUrgency: { type: String, enum: ['low', 'medium', 'high', 'urgent'] },
  taskStatus: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  taskCreatedAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('tasks', TaskSchema);

export default Task;