const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const oauthConfig = require("../config/oauth.config");

console.log("Google OAuth Config:", {
  clientID: oauthConfig.google.clientID,
  clientSecret: oauthConfig.google.clientSecret ? "****" : undefined,
});

if (!oauthConfig.google.clientID || !oauthConfig.google.clientSecret) {
  console.warn(
    "WARNING: Google OAuth credentials are not properly configured!",
  );
}

exports.signup = async (req, res) => {
  try {
    const { email, password, name, surname } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      email,
      password,
      name,
      surname,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        surname: user.surname,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for:", email);

    // Check if User is properly imported
    if (!User || typeof User.findOne !== "function") {
      console.error("User model is not properly defined:", User);
      return res
        .status(500)
        .json({
          message: "Internal server error - database model not available",
        });
    }

    // Find user with password field included
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      console.log("User not found:", email);
      return res.status(404).json({ message: "User not found" });
    }

    // Use correctPassword method
    const isValidPassword = await user.correctPassword(password, user.password);
    if (!isValidPassword) {
      console.log("Invalid password for user:", email);
      return res.status(401).json({ message: "Invalid password" });
    }

    console.log("User authenticated successfully:", email);
    const token = jwt.sign({ id: user._id }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        surname: user.surname,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error signing in", error: error.message });
  }
};

exports.login = exports.signin;

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};
