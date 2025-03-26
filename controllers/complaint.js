import Complaint from "../models/comlplaint.js";
import User from '../models/user.js';
import Message from '../models/message.js';

async function getAllComplaints(req,res){
  const {userId} = req.params

  if(!userId){
    return res.status(400).send("id is required");
  }

 // let userId = id;
   const result = await Complaint.find({userId});
   const chats = await Message.find({room: userId})
  
  if(!result){
    return res.status(400).send('no result');
  }

  return res.status(200).send({result,chats});

}

async function addComplaint(req, res) {
  const { userName, userEmail, img, title, description } = req.body;
  let id = req.params['id'];

  if (!userName) {
    return res.status(400).send("username is required");
  }
  if (!userEmail) {
    return res.status(400).send("useremail is required");
  }
  if (!img) {
    return res.status(400).send("img is required");
  }
  if (!title) {
    return res.status(400).send("title is required");
  }
  if (!description) {
    return res.status(400).send("description is required");
  }
  if (!id) {
    return res.status(400).send("userId is required");
  }

  const userId = id;

  const result = new Complaint({
    userName,
    userEmail,
    userId,
    img,
    title,
    description
  });

 // console.log(typeof(userId));

  await result.save();

  if (!result) {
    console.log("something is wrong");
  }

  let user = await User.findById(id);

  user.complaint.push(result._id);
  await user.save();

  return res.status(200).json({success: true});
}


async function editComplaint(req, res) {
  const {  img, title, description } = req.body;
  let id = req.params['id'];

  /*
  if (!img) {
    return res.status(400).send("img is required");
  }
  */
 
  if (!title )  {
    //console.log(title.length);
    return res.status(400).send("title is required");
  }
  if (!description) {
    return res.status(200).send("description is required");
  }
  

  
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).send("Complaint not found");
    }

    
    if(img){
      complaint.img = img;

    }
    complaint.title = title;
    complaint.description = description;

    await complaint.save();

    res.status(200).send({success: true});
  
}


async function deleteComplaint(req, res) {
  const  {id,userId} = req.params
  

  if (!id) {
    return res.status(400).send("complaintId is required");
  }

  let complaint = await Complaint.findById(id);

  if(!complaint){
    return res.status(400).send("complaint does not exists");
  }

  await complaint.deleteOne({id});

  let userID = complaint.userId;

  let user = await User.findById(userID);
  
  if(!user){
    return res.status(400).send("user not found");
  }

  
  let myArray = user.complaint

  // delete complaint from user array 
  const index = myArray.indexOf(id);
  const x = myArray.splice(index, 1);
  
  user.complaint = myArray

  user.save();
  return res.status(200).send({success: true});
}



export {
  getAllComplaints,
  addComplaint,
  editComplaint,
  deleteComplaint
};
