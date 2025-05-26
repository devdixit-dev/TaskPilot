import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'companies' },
  companyName: { type: String, required: true, unique: true },
  contactPersonFullname: { type: String, required: true, minLength: 6},
  companyEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 8 },
  isCompanyVerified: { type: Boolean },
  companyAdmins: { type: mongoose.Schema.Types.ObjectId, default: [] },
  companyManagers: { type: mongoose.Schema.Types.ObjectId, default: [], ref: 'users' },
  companyEmployees: { type: mongoose.Schema.Types.ObjectId, default: [], ref: 'users' },
  companyTasks: { type: mongoose.Schema.Types.ObjectId, default: [], ref: 'tasks' },
  companyCreatedAt: { type: Date, default: Date.now }
});

export default Company = mongoose.model('companies', CompanySchema);