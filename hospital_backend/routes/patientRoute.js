const jwt = require('jsonwebtoken');
const router = require("express").Router();
const bcrypt = require('bcryptjs');

let PATIENT = require("../models/patientDetails")// import patientDetails.js model
const Patient = require('../models/patientDetails');

// patient register
http://localhost:8070/patient/reg
     router.post('/reg', async(req,res) =>{
        const{pname,pemail,fpassword,cpassword,gender,phonenum} = req.body;
    
        if(!pname || !pemail || !fpassword || !cpassword || !gender || !phonenum){
            return res.status(422).json({error:"plz filled the field properly"});
        }
        try{
    
            const patientExist = await PATIENT.findOne({pemail:pemail});

            if(patientExist){
                return res.status(422).json({error:"Email already Exist"});
            }else if (fpassword !== cpassword) {

                return res.status(422).json({error:"Password are not matching"});
            } else{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
             

              const patient = new PATIENT({pname,pemail,fpassword,cpassword,gender,phonenum});

               patient.save()
              .then(patient=>{


                 res.status(201).json({message:"Registered Successfully"})
            
              })
              .catch(err=>{
                 console.log(err)
              });

           }

        }catch(err){
            console.log(err);
        }
    });

    
     //Login route
     http://localhost:8070/patient/login
 
    router.post('/login', async(req,res) =>{

        try{
              let token;
              const {pemail, cpassword} = req.body;

              if(!pemail || !cpassword){
                  return res.status(400).json({error:" Plz! Filled the data"});
              }

              const patientLogin = await PATIENT.findOne({pemail:pemail});
              //console.log(userLogin);

           if(patientLogin){

                const isMatch = await bcrypt.compare(cpassword, patientLogin.cpassword);
              
                 token  = await patientLogin.generateAuthToken();
                 console.log(token);

                 res.cookie("jwtoken", token, {
                     expires:new Date(Date.now() + 25892000000),
                     httpOnly: true
                 });

               if(!isMatch){

                res.status(400).json({error: "Invalid credentials password!"});

               }else{

                res.json({message: "login successfully!!"})
               }

           } else{

                res.status(400).json({error: "Invalid credentials !"});
               }


        }catch(err){
           console.log(err);
        }
    });


// Retrive  [Using GET http request method]
http://localhost:8070/patient/fetch
router.route("/fetch").get((req,res)=>{

    //body

    PATIENT.find().then((see)=>{
           res.json(see)
    }).catch((err)=>{
        console.log (err);
    })   
})

// Update [Usind PUT http request method.but also we can use POST method. ]
// Using azing await function  [execute multiple task]
http://localhost:8070/patient/edit/
router.route("/edit/:id").put(async(req,res)=>{
    let patientId = req.params.id ;  

    //D-Structure

    const{pname,pemail,fpassword,cpassword,gender,phonenum} = req.body;

    const editPatient = {

        pname,
        pemail,
        fpassword,
        cpassword,
        gender,
        phonenum

        
    }

    const edit = await PATIENT.findByIdAndUpdate(patientId,editPatient).then(()=>{

        res.status(200).send({status: "Updated Successfully" })
    }).catch((err)=>{

        console.log(err);
        res.status(500).send({status: "Error Occured!! "})              //also send to error for fontEnd
    })
}) 


   //Delete
 http://localhost:8070/patient/remove/
   router.route("/remove/:id").delete(async(req,res) =>{

       let patientid = req.params.id;

       await PATIENT.findByIdAndDelete(patientid).then(() =>{

           res.status(200).send({status: "Delete Successfully!!"});

       }).catch((err) =>{

             console.log(err.message);
             res.status(500).send({status: "Error with delete patient", error : err.message});
       })
   })
   
    //fetch one of user details[Using GET method]
    http://localhost:8070/patient/take/
    router.route("/take/:id").get(async(req,res) =>{

        let pname = req.params.id;
        const patient = await PATIENT.findById(pname).then((patient) =>{

           // res.status(200).send({status : " patient fetched",patient})
           res.json(patient);
        }).catch((err) =>{
            console.log(err.message);
            res.status(500).send({status: "Error with get patient", error : err.message})
        
        })
    })


module.exports = router;   // modules export
