import { User } from '@prisma/client';

import { GACCESS_TOKEN_RESPONSE } from '../types';
import dbClient from '../db';

const getUserDetails = async (
  email: string,
  selectedFields: Record<string, boolean> | null = null
) =>
  dbClient.user.findUniqueOrThrow({
    where: { email },
    select: selectedFields,
  });

const findOrCreateUser = async (
  userDetails: GACCESS_TOKEN_RESPONSE,
  selectedFields: Record<string, boolean> | null = null
) => {
  // Attempt to find an existing user by email

  const existingUser = await dbClient.user.findUnique({
    where: { email: userDetails.email },
    select: selectedFields,
  });

  // If the user exists, return the user
  if (existingUser) return existingUser;

  // If the user does not exist, create a new user
  const newUser = await dbClient.user.create({
    data: {
      email: userDetails.email,
      name: userDetails.name,
      img_url: userDetails.picture,
      auth_type: 'g_oauth',
    },
    select: {
      email: true,
      id: true,
      name: true,
      img_url: true,
      auth_type: true,
    },
  });

  // Return the newly created user
  return newUser;
};

const updateUser = async (
  id: number,
  dataToUpdate: Partial<User>,
  selectedFields: Record<string, boolean> | null = null
) =>
  dbClient.user.update({
    where: { id },
    data: dataToUpdate,
    select: selectedFields,
  });

const userService = {
  getUserDetails,
  findOrCreateUser,
  updateUser,
};

export default userService;
