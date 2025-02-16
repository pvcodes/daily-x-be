import jwt, { JwtPayload } from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY!;

export const generateToken = (data: Record<string, unknown>) => {
  return jwt.sign(data, secretKey, { expiresIn: '30d' });
};

export const verifyToken = (token: string) =>
  jwt.verify(token, secretKey) as JwtPayload;
