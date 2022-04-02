const router = require("express").Router();
let Doctor = require("../models/Doctor.js");

router.route("/add").post((req,res) =>{

    const did = Number(req.body.did);
    const name = req.body.name;
    const contact = Number(req.body.contact);
    const email = req. body.email;
    const gender = req.body. gender;
    const speciality = req.body.speciality;

    const newDoctor = new Doctor({
        did,
        name,
        contact,
        email,
        gender,
        speciality
    })

    newDoctor.save().then(()=>{
       
        res.json("Doctor Added")
    }).catch((err)=>{

        console.log(err);
    })
})

router.route("/").get((req,res)=>{

    Doctor.find().then((doctors)=>{
        res.json(doctors)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res)=>{

    let docID = req.params.id;
    const{ name, contact, email, gender, speciality} = req.body;

    const updateDoctor = {
        name,
        contact,
        email,
        gender,
        speciality
    }

    const update = await Doctor.findByIdAndUpdate(docID, updateDoctor).then(()=> {

        res.status(200).send({status:"Doctor updated" })
    }).catch((err)=> {
        res.status(500).send({status: "Error with updating data", error: err.message});
    })

})

router.route("/delete/:id").delete(async(req,res)=> {

    const docID = req.params.id;

    await Doctor.findByIdAndDelete(docID).then(()=> {
        res.status(200).send({status: "Doctor was deleted"});
    }).catch((err)=> {
       console.log(err.message);
       res.status(500).send({status: "Error with delete doctor", error: err.message});
    })
})

router.route("/get/:id").get(async(req,res)=> {

    let docID = req.params.id;

   const doctor = await Doctor.findById(docID).then((Doctor)=> {
       // res.status(200).send({status: "Doctor Fetched", Doctor})
       res.json(Doctor);
    }).catch((err)=> {
        console.log(err.message);
        res.status(500).send({status: "error with get doctor", error: err.message});  
     })

})





module.exports = router;