import jwt from "jsonwebtoken";
// Generate token

export const generateAccessToken = (channel) => {
  return jwt.sign(
    { id: channel.id, isAdmin: channel.isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: "2min",
    }
  );
};

// Generate refresh token
export const generateRefreshToken = (channel) => {
  return jwt.sign(
    { id: channel.id, isAdmin: channel.isAdmin },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "5min",
    }
  );
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You are not authenticated!");

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return res.status(403).json("Invalid token!");
    req.user = user;
    next();
  });
};
