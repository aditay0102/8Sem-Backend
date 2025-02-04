

function addComplaint(req,res){
    if (!req.file) {
        throw Error("FILE_MISSING");
      } else {
        res.send("success");
        console.log(req.file)
      }

}

export {
    addComplaint
}


