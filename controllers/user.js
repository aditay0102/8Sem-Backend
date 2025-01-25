import User from '../models/user.js'

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

    let user = await  User.findOne({email: email});

    if(user){
        return res.status(400).send('User already exists. Please sign in');
    }
    else{
        try{
            const user = new User({
                name: name,
                email: email,
                password: password
            })
            
            await user.save()
            return res.status(201).json(user)

        }
        catch(err){
            return res.status(400).json({message: err.message});
        }
    }

   
}

async function handleUserSignIn(req,res) {
    const {email,password} = req.body;

    if(!email){
        res.status(400).send("email is required");
    }

    const user = await User.findOne({email});

    if(user){
        const Password = await User.findOne({password});

        if(Password){
            res.status(200).send("success fully logged in");
        }
        else{
            res.status(400).send("password is wrong enter correct password");
        }
    }
    else{
        
        res.status(400).send("user doesn't exist please Sign up")
    }


   
}

async function test(req,res){

    res.send("working");
}

export {handleUserSignup,test,
    handleUserSignIn
};