const mongoose=require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({

   Appointment_ID : {
           type : String,
           required: true
   },
   Patient_Name : {
           type:String,
           required: true
   },
   Doctor_Name :{
       type:String,
   },
   Appointment_Date :{
           type:String,
           required:true
   },
   Description:{
           type:String,
   }
})

const Appointment = mongoose.model("Appointment",appointmentSchema);


module.exports = Appointment;