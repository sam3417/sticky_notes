import jwt from "jsonwebtoken";
import User from "../model/User.js";
import crypto from "crypto" ;

const signToken = (id) => {
  return jwt.sign({ id }, 'mysecret', {
    // payload + secret + expire time
    expiresIn: '1d',
  });
};

const createsendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  // Remove the password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

export const signup = async function (req, res) {
  try {
    console.log(req.body)

    const checkUser = await User.findOne({ email: req.body.email });
    if (checkUser) {
      return res.status(404).json({
        message : 'Account already exists'
      })
    }
    let user = await User.create({
      fullName: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });


    res.status(200).json({
      status: "Success",
      message: `Your account has been created successfully!`,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
  // createsendToken(user, 201, res);
};

export const login = async function(req,res,next) {
  const { email, password } = req.body;

  if (!email || !password) {
    //  check email and password exist
    return res.status(500).json({
        message : 'Please provider a valid email and password'
    });
  }

  const user = await User.findOne({email}).select("+password");

  if (!user) return res.status(404).json({message : `No User found against email ${email}`})
  if (
    !user || // check user exist and password correct
    !(await user.correctPassword(password, user.password))
  ) {
    // candinate password,correctpassword
    return res.status(404).json({message : "Incorrect email or password"})
  }


  createsendToken(user, 200, res);
}






