import jwt from "jsonwebtoken";

const tokenAndCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 1000,
    httpOnly: true, //protect xss
    sameSite: "strict", //protect csrf
  });
};

export default tokenAndCookie;
