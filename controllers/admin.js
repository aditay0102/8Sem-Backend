import Complaint from "../models/comlplaint.js";

async function handleAllComplaints(req,res){
    try {
        const complaints = await Complaint.find(); // Fetch all complaints from the database
        res.status(200).json(complaints); // Send the complaints as a JSON response
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve complaints", error: error.message }); // Handle errors
    }

}

async function handleStatus(req,res){
    const { status } = req.body;
  let id = req.params['id'];

  if (!status) {
    return res.status(400).send("status is required");
  }

  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).send("Complaint not found");
    }

    complaint.status = status;

    await complaint.save();

    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send("An error occurred while updating the complaint");
  }
}


// middleware to find if the role if admin then continue 
const roleMiddleware = (req, res, next) => {
    const role = req.headers['role'];

    if (role === '1') {
        next(); // Continue to the next middleware or route handler
    } else {
        res.send({success : 'false'});
    }
};




export {handleAllComplaints,handleStatus,roleMiddleware}