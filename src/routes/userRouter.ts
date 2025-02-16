import { Router } from 'express';

import { getToken, verifyTokenMiddleware } from '../middleware/auth';
import {
  createUser,
  getUserDetails,
  updateUserDetails,
} from '../controllers/userController';

// /user
const router = Router();

router.post('/token', getToken);
router.post('/verify-token', verifyTokenMiddleware, (_, res) => {
  res.send('ok');
});

router.post('/', createUser);
router.get('/', verifyTokenMiddleware, getUserDetails);
router.put('/', verifyTokenMiddleware, updateUserDetails);

export default router;
