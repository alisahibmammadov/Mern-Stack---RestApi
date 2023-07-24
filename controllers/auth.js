const bcrypt = require("bcryptjs");
const Auth = require("../models/auth");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await Auth.findOne({ email });
    if (user) {
      return res.status(500).json({ msg: "Bu email hesabi zaten var " });
    }
    if (password.length < 6) {
      return res
        .status(500)
        .json({ msg: "Parola 6 karakterden kucuk olmamali " });
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await Auth.create({
      username,
      email,
      password: passwordHash,
    });
    const userToken = jwt.sign({ id: newUser.id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    res.status(201).json({
      status: "OK",
      newUser,
      userToken,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(500).json({ msg: "Boyle bir kullanici bulunamadi" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(500).json({ msg: "Parola yanlis" });
    }
    const token = jwt.sign({id:user.id},process.env.SECRET_TOKEN,{expiresIn:"1h"})
    res.status(200).json({
        status:"OK",
        user,
        token
    })
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  register,
  login
};
