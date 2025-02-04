import express from 'express';
import multer from 'multer';

import { handleUserSignup, test, handleUserSignIn, authentication } from '../controllers/user.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads")
  },
  filename: function (req, file, cb) {
   
    cb(null, file.originalname )
  }
})


const upload = multer({  storage });

// Routes
router.post('/Signup', handleUserSignup);
router.post('/Login', handleUserSignIn);
router.post('/authenticate', authentication);
router.get('/home', test);

// Add a route for image upload
router.post('/upload', upload.single('file'), (req, res) => {
    if(!req.file){
        res.status(400).send(" file missing");
    }
    
    console.log(req.file)
    
});

export default router;
