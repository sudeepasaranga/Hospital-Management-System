const jwt = require('jsonwebtoken');
const router = require("express").Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const authenticate = require("../middleware/authenticate");

let USER = require("../models/userDetails");// import userDetails.js model
const User = require('../models/userDetails');



// ADD
http://localhost:8070/user/add
router.route("/add").post((req,res)=>{//post method for add data 

     const uid = req.body.uid;
     const uname = req.body.uname;
     const email = req.body.email;
     const password = req.body.password;
     const usertype = req.body.usertype;
     const phone = req.body.phone;
     
    
     

     const newUser = new USER({
         
        uid,
        uname,
        email,
        password,
        usertype,
        phone
    

     })
       
     //Exception handlling
     newUser.save().then(()=>{ //js promiss
         res.json("USER loggin details added!!")  //send a request from json format to front end

     }).catch((err)=>{
              console.log (err);
     })   
})  



// Retrive  [Using GET http request method]
http://localhost:8070/user/display
router.route("/display").get((req,res)=>{

    //body

    USER.find().then((see)=>{
           res.json(see)
    }).catch((err)=>{
        console.log (err);
    })   
})

// Update [Usind PUT http request method.but also we can use POST method. ]
// Using azing await function  [execute multiple task]
http://localhost:8070/user/update/
router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id ;  

    //D-Structure

    const{uid,uname,email,password,usertype,phone} = req.body;

    const updateUser = {

        uid,
        uname,
        email,
        password,
        usertype,
        phone

        
    }

    const update = await USER.findByIdAndUpdate(userId,updateUser).then(()=>{

        res.status(200).send({status: "User Updated" })
    }).catch((err)=>{

        console.log(err);
        res.status(500).send({status: "Error Occured!! "})              //also send to error for fontEnd
    })
}) 


   //Delete
 http://localhost:8070/user/delete
   router.route("/delete/:id").delete(async(req,res) =>{

       let userid = req.params.id;

       await USER.findByIdAndDelete(userid).then(() =>{

           res.status(200).send({status: "Delete Successfully!!"});

       }).catch((err) =>{

             console.log(err.message);
             res.status(500).send({status: "Erroe with delete User", error : err.message});
       })
   })
   
    //fetch one of user details[Using GET method]

    router.route("/get/:id").get(async(req,res) =>{

        let uid = req.params.id;
        const user = await USER.findById(uid).then((user) =>{

           // res.status(200).send({status : "user fetched",user})
           res.json(user);
        }).catch((err) =>{
            console.log(err.message);
            res.status(500).send({status: "Error with get User", error : err.message})
        
        })
    })

     //register
     http://localhost:8070/user/register
    router.post('/register', async(req,res) =>{
        const{uid,uname,email,password,usertype,phone} = req.body;
    
        if(!uid || !uname || !email || !password || !usertype || !phone){
            return res.status(422).json({error:"plz filled the field properly"});
        }
        try{
    
            const userExist = await USER.findOne({uid:uid});

            if(userExist){
                return res.status(422).json({error:"User Id  already Exist"});
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
             

            const userImp = await USER.findOne({email:email});

            if(userImp){
                return res.status(422).json({error:"Email already Exist"});
            } 
             



            const user = new USER({uid,uname,email,password,usertype,phone});

            await user.save()
            .then(user=>{

            

                res.status(201).json({message:"user added successfully"});

            })
            .catch(err=>{
                console.log(err)
            })


             


        }catch(err){
            console.log(err);
        }
    });
    
     //Login route
    router.post('/signin', async(req,res) =>{

        try{
              let token;
              const {email, password,usertype} = req.body;

              if(!email || !password || usertype){
                  return res.status(400).json({error:" Plz! Filled the data"});
              }

              const userLogin = await USER.findOne({email:email});
              //console.log(userLogin);

           if(userLogin){

                const isMatch = await bcrypt.compare(password, userLogin.password);
              
               const  token  = await userLogin.generateAuthToken(); //see thsis
                 console.log(token);
 


                 res.cookie('jwtoken', token, {
                     expires:new Date(Date.now() + 25892000000),
                     httpOnly: true
                 });

               if(!isMatch){

                res.status(400).json({error: "Invalid password!"});

               }else{

                res.json({message: "user login successfully!!"})
               }


               //
              
               //

               } else{

                res.status(400).json({error: "Invalid credentials !"});
               }


        }catch(err){
           console.log(err);
        }
    });
//reset-password
    router.post('/reset-password', (req,res)=>{
        crypto.randomBytes(32,(err,buffer)=>{
            if(err){
                console.log(err);
            }
            const token  = buffer.toString("hex")
            USER.findOne({email:req.body.email})
            .thrn(user=>{
                if(!user){
                    return res.status(422).json({error:"user dont with email"})
                }
                user.resetToken = token
                user.expireToken = Date.now() + 3600000
                user.save().then((result) =>{
                    transporter.sendMail({
                        to:user.email,
                        from:"no-replay@insta.com",
                        subject:"password reset",
                        html:`
                        <p> You requested for password reset</p>
                        <h5>click in this <a href="http://localhost:3000/reset/${token}">link</a></h5>
                        
                        `

                    })
                    res.json({message:"check your email"})
                })
                
            })
        })
    })

    //about 
    router.get('/about', authenticate ,(req,res) => {
        console.log("Hello");
        res.send("hello About world from the server");

   });


       //Logout
       router.get('/logout',(req,res) => {
        console.log("Hello");
        res.clearCookie('jwtoken', {path: '/'})
        res.status(200).send("User logout");

   });

  



module.exports = router;   // modules export
//mongodb+srv://Saranga:WMQqeUeAiTIuUVm9@userdb.1fach.mongodb.net/user_db?retryWrites=true&w=majority