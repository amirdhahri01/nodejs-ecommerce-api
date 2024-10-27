import User from "../model/User.js";

// @desc   Register user
// @route  Post /api/v1/users/register
// @access Private/Admin

export const registerUserCtrl = async (req, res) => {
  const { fullname, email, password } = req.body;
  //Check user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    //throw
    res.json({ msg: "User already exists" });
  }
  //hash password
  //create the user
  const user = await User.create({ fullname, email, password });
  res
    .status(201)
    .json({
      status: "success",
      message: "User Registered Successfully",
      data: user,
    });
};
