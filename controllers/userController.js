const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = {
  async register(req, res) {
    try {
      const { firstname, lastname, email, password } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in exist!" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error });
    }
  },

  // Login a user
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Generate token
      const token = generateToken(user);

      // Return response
      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error });
    }
  },

  // Get user profile
  async getProfile(req, res) {
    try {
      const userId = req.user.id; 
      const user = await User.findByPk(userId, {
        attributes: ["id", "firstname", "lastname", "email"],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error });
    }
  },

  async deleteProfile(req, res) {
    try {
      const userId = req.user.id; 
      const rowsDeleted = await User.destroy({ where: { id: userId } });

      if (!rowsDeleted) {
        return res.status(404).json({ message: "User not found" });
      }

      return res
        .status(200)
        .json({ message: "User profile deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error });
    }
  },
};
