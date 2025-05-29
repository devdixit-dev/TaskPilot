import User from '../models/User.js';
import Company from '../models/Company.js';

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
        message: 'User not found or incorrect token. contact admin'
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