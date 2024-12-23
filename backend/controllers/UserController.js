import User from "../models/User.js";

export const userSideBar = async (req, res) => {
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
