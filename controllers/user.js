
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';


async function handleUserSignup(req,res) {
    
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    
    
    
    if(!name){
        return res.status(400).send("name is required");
    }
    
    if(!email){
        return res.status(400).send("email is required");
    }
    
    if(!password){
        return res.status(400).send("password is required");
    }

    const hashedPassword  = await bcrypt.hash(password,10);

    let user = await  User.findOne({email: email});

    if(user){
        return res.status(400).send('User already exists. Please sign in');
    }
    else{
        try{
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword
            })
            
            await user.save()
            return res.status(201).json({user,success : "true"})

        }
        catch(err){
            return res.status(400).json({message: err.message});
        }
    }

   
}

async function handleUserSignIn(req,res) {
    const {email,password} = req.body;

    if(!email){
        return res.status(400).send("email is required");
    }

    const user = await User.findOne({email});

    if(user){
        if(!password) return res.status(400).json({success: "false", message: "password is required"});
        const match = await bcrypt.compare(password,user.password);
        const  accessToken = jwt.sign(JSON.stringify(user),process.env.TOKEN_SECRET)


        if(match){
            //res.status(200).send({ accessToken: accessToken });
           
            return res
            .cookie("access_toekn",accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
            .status(200)
            .json({accessToken,success : "true",
                user
            });

        }
        else{
            res.status(400).send({success: "false",message: "wrong password"});
        }
    }
    else{
        
        res.status(400).send({succes: "false",message:"user not found"})
    }


   
}

async function authentication(req,res,next) {
    const token = req.headers['authorization'];
  
    // If token is not provided, return an error
    if (!token) return res.sendStatus(401);
  
    // Verify token
    jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
      if (err) return res.sendStatus(403);
      next();
    })
}

async function test(req,res){

    res.send("working");
}

export {handleUserSignup,test,
    handleUserSignIn,
    authentication
};