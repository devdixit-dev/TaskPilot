import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  userFullname: { type: String, required: true },
  userEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 8 },
  userRole: { type: String, enum: ['admin', 'manager', 'employee']},
  isUserVerified: { type: Boolean },
  userCompany: { type: mongoose.Schema.Types.ObjectId, default: [], ref: 'companies' },
  userTasks: { type: mongoose.Schema.Types.ObjectId, default: [], ref: 'tasks' },
  userCreatedAt: { type: Date, default: Date.now }
});

export default User = mongoose.model('users', UserSchema);