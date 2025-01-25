import express from 'express';

import {handleUserSignup,test,handleUserSignIn} from '../controllers/user.js'

const router  = express.Router();

router.post("/Signup",handleUserSignup);
router.post("/Login",handleUserSignIn);
router.get('/home',test);

export default router;