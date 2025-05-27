import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId: { type: String },
  userFullname: { type: String, required: true },
  userEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 8 },
  userRole: { type: String, enum: ['admin', 'manager', 'employee']},
  isUserVerified: { type: Boolean },
  userCompany: { type: String, required: true, ref: 'companies' },
  userTasks: { type: [mongoose.Schema.Types.ObjectId], default: [], ref: 'tasks' },
  userCreatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('users', UserSchema);

export default User;