import Task from "../models/Task.js";
import User from "../models/User.js";
import Company from "../models/Company.js"

import decodeJwt from "../utills/decodeJwt.js";

export const CreateNewTask = async (req, res) => {
  try{
    const userToken = decodeJwt(req.cookies['session-uid']);

    if(!userToken) {
      return res.json({
        success: false,
        message: 'Unauthorized access denied'
      })
    }

    if(!userToken.role === 'admin' && !userToken.role === 'manager') {
      return res.json({
        success: false,
        message: 'You are not an authorized person for creating tasks'
      })
    }

    const {name, desc, taskFor, urgency} = req.body;

    const task = await Task.create({
      taskName: name,
      taskDesc: desc,
      taskCreatedBy: userToken.id,
      taskForEmployee: taskFor,
      taskUrgency: urgency,
      taskStatus: "pending"
    })

    const taskCreatedBy = await User.findOne({ _id: userToken.id }); // get admin id
    const taskForEmployee = await User.findOne({ userFullname: taskFor }); // get user id
    const company = await Company.findOne({ companyName: taskCreatedBy.userCompany }); // get company name

    company.companyTasks.push(task._id);
    taskForEmployee.userTasks.push(task._id);

    taskForEmployee.save();
    company.save();
    task.save();

    return res.json({
      success: true,
      message: `New task assign for ${taskForEmployee.userFullname} from ${taskCreatedBy.userFullname}.`
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