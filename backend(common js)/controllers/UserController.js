const User = require("../models/User");
const fs = require("fs/promises");
const path = require("path");

const userSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );

    res.status(200).json(allUsers);
  } catch (error) {
    console.error("sidebar Error : ", error.message);
    res.status(500).json({
      error: "internal server error",
    });
  }
};

const uploadPhotoController = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (user.photoProfile != "") {
      const previousFilePath = path.join(__dirname, "..", user.photoProfile);
      try {
        await fs.unlink(previousFilePath);
      } catch (error) {
        console.error("Failed to delete previous file:", error.message);
      }
    }
    user.photoProfile = `/public/photos/${req.file.filename}`;
    await user.save();

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      photoProfile: user.photoProfile,
      gender: user.gender,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};

const updateUserController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, gender } = req.body;

    if (!fullName || !gender) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (fullName && fullName != user.fullName) user.fullName = fullName;
    if (gender && gender != user.gender) user.gender = gender;

    await user.save();

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      photoProfile: user.photoProfile,
      gender: user.gender,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};

module.exports = {
  userSideBar,
  uploadPhotoController,
  updateUserController,
};
