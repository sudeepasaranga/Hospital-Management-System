const router = require("express").Router();
let Appointment = require("../models/Appointment");

router.route("/add").post((req,res)=>{
   const  Appointment_ID = req.body.Appointment_ID;
   const  Patient_Name = req.body.Patient_Name;
   const  Doctor_Name = req.body.Doctor_Name;
   const  Appointment_Date = req.body.Appointment_Date;
   const  Description = req.body.Description;

   const newAppointment = new Appointment({

    Appointment_ID,
    Patient_Name,
    Doctor_Name,
    Appointment_Date,
    Description
   })
   newAppointment.save().then(() =>{
       res.json("Appointment Added")
   }).catch((err) =>{
       console.log(err);
   })
})

router.route("/").get((req,res)=>{

     Appointment.find().then((appointments) =>{
        res.json(appointments)
     }).catch((err) =>{
         console.log(err);
     })
})

router.route("/aupdate/:id").put(async (req,res) =>{
   let appointmentno = req.params.id;
   const {Appointment_ID, Patient_Name, Doctor_Name, Appointment_Date, Description} = req.body;

   const updateAppointment = {
    Appointment_ID,
    Patient_Name,
    Doctor_Name,
    Appointment_Date,
    Description
   }

   const update = await Appointment.findByIdAndUpdate(appointmentno, updateAppointment).then(() =>{

   res.status(200).send({status: "Appointment updated"})
}).catch((err) => {
    console.log(err);
    res.status(500).send({status: "Error with updating data", error: err.message});
})
})

router.route("/delete/:id").delete(async (req,res) => {
    let appointmentno = req.params.id;
 
    const appointment =await Appointment.findByIdAndDelete(appointmentno)
    .then((appointment) => {
       // res.status(200).send({status: "Appointment deleted"});
       res.json(appointment);
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete appointment", error: err.message});
 
    })
 })
 
 router.route("/get/:id").get(async(req,res) =>{
     let appointmentno = req.params.id;
     await Appointment.findById(appointmentno)
     .then((appointment) => {
         //res.status(200).send({status: "Appointment fetched", appointment})
         res.json(appointment);
     }).catch((err) =>{
         console.log(err);
         res.status(500).send({status: "Error with get user", error: err.message});
         })
     })


     module.exports = router;