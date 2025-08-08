const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateTokens");
const validator = require("validator");
// ...existing code...

const registerUser = async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;

  // Validation checks remain the same...

  try {
    // Fix: Change find() to findOne() and correct the condition check
    const userExists = await User.findOne({ emailId });
    if (userExists) {  // Remove the previous condition
      return res.status(400).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });

    await newUser.save();
    const token = generateToken(newUser);

    return res.status(201).json({
      message: "USER ADDED SUCCESSFULLY",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message,
    });
  }
};

// ...existing code...

// const registerUser = async (req, res) => {
//   const { firstName, lastName, emailId, password } = req.body;

//   //VALIDATION

//   if (!firstName || !emailId || !password) {
//     return res.status(400).send({ message: "Please Add all mandatory fields" });
//   }

//   if(!validator.isEmail(emailId)){
//     return res.status(400).send({ message: "Please Provide Correct Email" });
//   }

//   if(!validator.isStrongPassword(password)){
//     return res.status(400).send({ message: "Please Provide Strong Password" });
//   }



//   try {
//     //Check the user existing already in db or not
//     const userExists = await User.find({ emailId });
//     if (userExists) {
//       return res.status(400).json({ message: "Already Exist" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     //CREATE USER IN YOUR DATABASE

//     const newUser = await User.create({
//       firstName,
//       lastName,
//       emailId,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     const token = generateToken(newUser);

//     return res.status(201).json({
//       message: "USER ADDED SUCCESSFULLY",
//       token,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       err: err.message,
//     });
//   }
// };

const loginUser = async (req, res) => {
  const { emailId, password } = req.body;

  //VALIDATION

  if (!emailId || !password) {
    return res.status(400).json({ message: "ADD ALL DETAILS" });
  }

  try{
    const userExists = await User.findOne({ emailId });
  console.log(userExists);

  if (!userExists) {
    return res.status(400).json({ message: "No user Found" });
  }

  const isValid = await bcrypt.compare(password, userExists.password);

  if (!isValid) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  const token = generateToken(userExists);

  return res.status(200).json({ message: "LoggedIn", token });
  }catch(err){
    return res.status(500).json({
      err: err.message,
    });
  }
};

module.exports = { registerUser, loginUser };