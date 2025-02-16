import { NextFunction, Request, Response } from 'express';

import { TokenType } from '../types';
import userService from '../services/userService';
import { comparePassword, verifyGoogleOauthToken } from '../utils';
import { generateToken, verifyToken } from '../utils/jwt';

export const getToken = async (req: Request, res: Response) => {
  try {
    const type = req.query.type as TokenType;
    if (!type) {
      res.status(400).json({ error: 'Token type is required' });
      return;
    }

    if (type === 'google-oauth') {
      const gaccess_token = req.headers?.['x-gaccess_token'] as string;
      if (!gaccess_token) {
        res.status(400).json({ error: 'Google access token is required' });
        return;
      }

      const user = await verifyGoogleOauthToken(gaccess_token);
      const userFromDb = await userService.findOrCreateUser(user, {
        id: true,
        email: true,
        auth_type: true,
      });

      const auth_token = generateToken(userFromDb);
      res.json({ auth_token });
      return;
    } else if (type === 'basic') {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
      }

      const userFromDb = await userService.getUserDetails(email);
      const isPassCorrect = await comparePassword(
        password,
        userFromDb.password! // if auth_type is basic, password is must
      );
      if (!isPassCorrect) {
        res.status(400).json({ error: 'Invalid Password' });
        return;
      }
      const auth_token = generateToken({
        id: userFromDb.id,
        email: userFromDb.email,
        auth_type: userFromDb.auth_type,
      });

      res.json({
        auth_token,
        id: userFromDb.id,
        name: userFromDb.name,
        email: userFromDb.email,
        img_url: userFromDb.img_url,
      });
      return;
    } else {
      res.status(400).json({ error: 'Invalid token type' });
      return;
    }
  } catch (error) {
    console.error('Error in getToken:', error);
    res.status(500).json({ error });
  }
};

export const verifyTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization ?? '';
    const decoded = verifyToken(token);
    req.user = {
      id: decoded.id,
      email: decoded.email,
      auth_type: decoded.auth_type,
    };
    next();
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
  //
};
