import jwt from 'jsonwebtoken';
// import { SECRET_KEY } from './config.js';
import config from './config.js';

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.app.jwtKey); //return payload
    return decoded;
  } catch (error) {
    return null;
  }
};

export const generateToken = async () => {
  return jwt.sign({}, config.app.jwtKey, {
    expiresIn: '2h',
  });
};

export const validateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'].split(' ');

    if (!authHeader) {
      throw new Error('Unauthorized');
    }

    const authSchema = authHeader[0];
    const authToken = authHeader[1];
    const payload = verifyToken(authToken);

    if (!payload || authSchema != 'Bearer') {
      throw new Error('Unauthorized');
    }

    req.user = payload;

    next();
  } catch (error) {
    ////console.log(error)
    res.status(401).send({ 
      status: 'failed', 
      Error: error.message 
    });
  }
};
