import { nanoid } from 'nanoid'
import bcrypt from 'bcryptjs'

import Company from "../models/Company.js";
import User from '../models/User.js';

export const CompanySignUP = async (req, res) => {

  const {
    companyName,
    contactPersonFullname,
    companyEmail,
    password
  } = req.body;

  try {
    const user = await Company.findOne({ companyEmail });

    if (user) {
      return res.json({
        success: false,
        message: 'Company is already exist'
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const CompanyID = nanoid(8);
    console.log(CompanyID);

    // create company account
    const createCompany = await Company.create({
      companyId: CompanyID,
      companyName,
      contactPersonFullname,
      companyEmail,
      password: hashPassword,
    });

    // create admin account
    const createAdmin = await User.create({
      userFullname: contactPersonFullname,
      userEmail: companyEmail,
      password: hashPassword,
      userRole: 'admin',
      userCompany: companyName,
    });
    createAdmin.save();

    createCompany.companyAdmin.push(createAdmin._id);
    createCompany.save();

    return res.json({
      success: true,
      message: 'Your account is created, verify your account !',
      company: createCompany,
      admin: createAdmin
    })
  }
  catch(e) {
    console.log(`Server error: ${e}`);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}