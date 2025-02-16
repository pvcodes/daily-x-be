import { Request, Response } from 'express';

import userService from '../services/userService';
import { generateToken } from '../utils/jwt';

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserDetails(req.user!.email, {
      id: true,
      name: true,
      email: true,
      auth_type: true,
      img_url: true,
    });
    res.json(user);
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    // TODO: data validation
    const user = await userService.findOrCreateUser(payload, {
      id: true,
      name: true,
      email: true,
      auth_type: true,
      img_url: true,
    });
    const token = generateToken({
      id: user.id,
      email: user.email,
      auth_type: user.auth_type,
    });
    res.json({ ...user, token });
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};

export const updateUserDetails = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    // TODO: data validation
    const updateUser = await userService.updateUser(req.user!.id, payload, {
      id: true,
      name: true,
      email: true,
      auth_type: true,
      img_url: true,
    });

    const response = {
      ...updateUser,
      ...(payload.email && {
        // if email is updated only then generate new token
        token: generateToken({
          id: updateUser.id,
          email: updateUser.email,
          auth_type: updateUser.auth_type,
        }),
      }),
    };

    res.json(response);
    return;
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};
