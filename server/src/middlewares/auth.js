import jwt from 'jsonwebtoken';

export const authCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.id;

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
