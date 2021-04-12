import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

const SECRET = "secret";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    console.log("try");
    const existingUser = await User.findOne({ email });
    console.log("user found", existingUser);
    if (existingUser === null) {
      console.log("in");
      return res.status(404).json({ message: "User doesn't exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials." });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const signUp = async (req, res) => {
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    codeforces,
    codechef,
  } = req.body;
  console.log(email, password, firstName, lastName);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    console.log("not a existing");
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don' match" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await new User({
      name: `${firstName} ${lastName}`,
      email: email,
      password: hashedPassword,
      codechef: codechef,
      codeforces: codeforces,
    });
    console.log("newUser", newUser);
    await newUser.save();

    const token = jwt.sign({ email: newUser.email, id: newUser._id }, SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ result: newUser, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something Went Wrong" });
  }
};
