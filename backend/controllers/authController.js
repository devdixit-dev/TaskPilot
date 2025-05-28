import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

    // create random otp
    const randomOtp = Math.round(Math.random() * 999999);

    createCompany.companyVerifyOtp = randomOtp;
    createCompany.save();

    const token = jwt.sign({ id: createCompany._id, role: createAdmin.userRole }, process.env.JWT_SECRET, { expiresIn: '30m' });

    return res
      .cookie('regToken', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 30 * 60 * 1000, // 30min
      })
      .json({
        success: true,
        message: 'Your account is created, verify your account !',
        company: createCompany,
        admin: createAdmin
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

export const CompanyVerification = async (req, res) => {
  const token = req.cookies.regToken;
  const otp = req.body;

  try {
    if (!token) {
      return res.status(401).json(
        { message: 'No token provided' }
      );
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const companyID = decodedToken.id;

    const findCompany = await Company.findOne({ _id: companyID });

    if (!findCompany) {
      return res.json({
        success: false,
        message: 'Your company has not registered yet'
      })
    }

    const alreadyVerified = findCompany.isCompanyVerified;

    if (alreadyVerified) {
      return res.json({
        success: true,
        message: 'Your account is already verified. You can login now'
      })
    }

    if (Date.now() >= findCompany.companyVerifyOtpExpiresAt) {
      return res.json({
        success: false,
        message: 'Your account is locked, cause of late verification. contact admin.'
      })
    }

    const checkOtp = findCompany.companyVerifyOtp === otp.otp;

    if (!checkOtp) {
      return res.json({
        success: false,
        message: 'Incorrect OTP, check your email once again'
      })
    }

    findCompany.companyVerifyOtp = '';
    findCompany.isCompanyVerified = true;

    // find admin and verify admin
    const adminID = findCompany.companyAdmin;
    const user = await User.findOne({ _id: adminID });
    user.isUserVerified = true;
    user.save();

    findCompany.save();

    return res.json({
      success: true,
      message: 'Your company has been verified successfully'
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

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ userEmail: email });

    if (!user) {
      return res.json({
        success: false,
        message: 'User not found.'
      })
    }

    const decodePassword = await bcrypt.compare(password, user.password);

    if (!decodePassword) {
      return res.json({
        success: false,
        message: 'Incorrect email or password'
      })
    }

    const findUserCompany = await Company.findOne({ companyName: user.userCompany });

    if (!findUserCompany.isCompanyVerified) {
      return res.json({
        success: false,
        message: 'Your company verification is pending',
        userCompany: findUserCompany
      })
    }

    if(!user.isUserVerified) {
      return res.json({
        success: false,
        message: 'You are not verified user. contact your admin'
      })
    }

    const token = jwt.sign({ id: user._id, role: user.userRole }, process.env.JWT_SECRET, { expiresIn: '60m' });

    // Set the cookie
    res.cookie('session-uid', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1h
    });

    // Redirect based on user role
    if (user.userRole === 'admin') {
      return res.redirect('/admin-dashboard');
    } else if (user.userRole === 'manager') {
      return res.redirect('/manager-dashboard');
    } else {
      return res.redirect('/user-dashboard');
    }
  }
  catch (e) {
    console.log(`Server error: ${e}`);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}