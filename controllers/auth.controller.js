const config = require("../config/auth.config");
const prisma = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { username, email, phone, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password);

  try {
    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
        phone: phone,
      },
    });
    res.status(200).send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isEmail = validateEmail(email);
    let user;
    if (isEmail) {
      user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
    } else {
      user = await prisma.user.findUnique({
        where: {
          username: email,
        },
      });
    }
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.logout = (req, res) => {
  res.status(200).send({ accessToken: null });
};

function validateEmail(email) {
  console.log(email);
  const re = /\S+@\S+\.\S+/;
  const result = re.test(email);
  console.log(result);
  return result;
}
