const router = require("express").Router();
let Prescript = require("../models/Prescript.js");

router.route("/padd").post((req,res) =>{

    const presID = Number(req.body.presID);
    const patientName = req.body.patientName;
    const patientAge = Number(req.body.patientAge);
    const doctorName = req.body.doctorName;
    const description = req.body.description;
  

    const newPrescript = new Prescript({
        presID,
        patientName,
        patientAge,
        doctorName,
        description
    })
      
    newPrescript.save().then(()=>{
       
        res.json("Prescription Added")
    }).catch((err)=>{

        console.log(err);
    })

})

router.route("/").get((req,res)=>{

    Prescript.find().then((prescript)=>{
        res.json(prescript)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/pupdate/:id").put(async(req,res)=>{

    let preID = req.params.id;
    const{patientName,patientAge,doctorName,description} = req.body;

    const updatePrescript = {
        patientName,
        patientAge,
        doctorName,
        description
    }

    const update = await Prescript.findByIdAndUpdate(preID, updatePrescript).then(()=> {

        res.status(200).send({status:"Prescription updated" })
    }).catch((err)=> {
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
})

router.route("/pdelete/:id").delete(async(req,res)=> {

    let prename = req.params.id;

    await Prescript.findByIdAndDelete(prename).then(()=> {
        res.status(200).send({status: "Prescription was deleted"});
    }).catch((err)=> {
       console.log(err.message);
       res.status(500).send({status: "Error with delete Prescription", error: err.message});
    })
})

router.route("/pget/:id").get(async(req,res)=> {

    let preID = req.params.id;

   const prescript = await Prescript.findById(preID).then((Prescript)=> {
        //res.status(200).send({status: "Prescription Fetched", Prescript})
        res.json(Prescript);
    }).catch((err)=> {
        console.log(err.message);
        res.status(500).send({status: "error with get prescription", error: err.message});  
     })

})


    module.exports = router;