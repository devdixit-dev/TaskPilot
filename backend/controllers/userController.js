import User from '../models/User.js';
import Company from '../models/Company.js';
import bcrypt from 'bcryptjs'

import decodeJwt from '../utills/decodeJwt.js';

export const GetAdminDashboard = async (req, res) => {
  try {
    const userToken = decodeJwt(req.cookies['session-uid']);

    if (!userToken) {
      return res.json({
        success: false,
        message: 'Unauthorized access denied'
      })
    }

    const user = await User.findOne({ _id: userToken.id });

    if (!user) {
      return res.json({
        success: false,
        message: 'User not found or invalid token. contact admin'
      })
    }

    const company = await Company.findOne({ companyName: user.userCompany });

    return res.json({
      success: true,
      name: user.userFullname,
      email: user.userEmail,
      company: user.userCompany,
      total_employees: company.companyEmployees.length,
      total_tasks: company.companyTasks.length,
      completed_today: 20,
      productivity: '10%' 
    });
  }
  catch (e) {
    console.log(`Server error: ${e}`);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

export const UserLogOut = async (req, res) => {
  const userToken = decodeJwt(req.cookies['session-uid']);

  try {
    if (!userToken) {
      return res.json({
        success: false,
        message: 'Unauthorized access denied'
      })
    }

    res.clearCookie('session-uid', {
      httpOnly: true,
      sameSite: 'strict'
    });
    return res.json({
      success: true,
      message: 'Log out successfully'
    })
  }
  catch (e) {
    console.log(`Server error: ${e}`);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

export const AddNewUser = async (req, res) => {
  try{
    const userToken = decodeJwt(req.cookies['session-uid']);

    if(!userToken) {
      return res.json({
        success: false,
        message: 'Unauthorized access denied'
      })
    }

    if(!userToken.role === 'admin') {
      return res.json({
        success: false,
        message: 'You are not an admin'
      })
    }

    const {name, email, password, role} = req.body;

    const isUserExist = await User.findOne({ userEmail: email });

    if(isUserExist) {
      return res.json({
        success: false,
        message: 'This user is already exist'
      })
    }

    if(role === 'admin'){
      return res.json({
        success: false,
        message: 'You are not become an admin. please contact your IT team to become an admin'
      })
    }

    const admin = await User.findOne({ _id: userToken.id });

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userFullname: name,
      userEmail: email,
      password: hashPassword,
      userRole: role,
      userCompany: admin.userCompany,
      isUserVerified: true
    });

    const company = await Company.findOne({ companyName: admin.userCompany });
    if(role === 'manager') {
      company.companyManagers.push(user._id);
    }
    else{
      company.companyEmployees.push(user._id);
    }
    await company.save();

    return res.json({
      success: true,
      message: `${admin.userFullname} you are added ${user.userFullname} in ${company.companyName} as ${role}.`
    })
  }
  catch (e) {
    console.log(`Server error: ${e}`);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}