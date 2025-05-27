import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  companyId: { type: String, required: true },
  companyName: { type: String, required: true, unique: true },
  contactPersonFullname: { type: String, required: true, minLength: 6},
  companyEmail: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 8 },
  isCompanyVerified: { type: Boolean },
  companyVerifyOtp: { type: String, default: '' },
  companyVerifyOtpCreatedAt: { type: Date, default: Date.now },
  companyVerifyOtpExpiresAt: { type: Date, default: () => new Date(Date.now() + 15 * 60 * 1000) },
  companyAdmin: { type: [mongoose.Schema.Types.ObjectId], required: true },
  companyManagers: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  companyEmployees: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  companyTasks: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  companyCreatedAt: { type: Date, default: Date.now }
});

const Company = mongoose.model('companies', CompanySchema);

export default Company;