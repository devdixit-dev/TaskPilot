import mongoose from 'mongoose'

const TaskSchema = mongoose.Schema({
  taskName: { type: String, required: true },
  taskDesc: { type: String, required: true },
  taskCreatedBy: { type: [mongoose.Schema.Types.ObjectId], required: true },
  taskForEmployee: { type: [mongoose.Schema.Types.ObjectId], required: true },
  taskUrgency: { type: String, enum: ['low', 'medium', 'high', 'urgent'] },
  taskStatus: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  taskCreatedAt: { type: Date, default: Date.now }
});

export default TaskSchema;