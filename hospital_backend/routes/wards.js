const router = require("express").Router();
let Ward = require("../models/Ward");

router.route("/wardadd").post((req,res)=>{

    const ward_id = req.body.ward_id;
    const ward_name = req.body.ward_name;
    const ward_catogory = req.body.ward_catogory;
    const total_bed_amount = Number(req.body.total_bed_amount);
    const empty_beds = Number(req.body.empty_beds);
  

    const newWard = new Ward({

        ward_id,
        ward_name,
        ward_catogory,
        total_bed_amount,
        empty_beds

    })

    newWard.save().then(()=>{
        res.json("Ward Added")
    }).catch((err)=>{
        console.log(err);
    })


})

router.route("/allwards").get((req,res)=>{
    Ward.find().then((wards)=>{
        res.json(wards)
    }).catch((err)=>{
        console.log(err);
    })

})


router.route("/updateward/:id").put(async (req,res) => {
    let wardId = req.params.id;
    const {ward_id, ward_name, ward_catogory, total_bed_amount, empty_beds} = req.body;

    const updateWard = {

        ward_id,
        ward_name,
        ward_catogory,
        total_bed_amount,
        empty_beds
    }

    const update = await Ward.findByIdAndUpdate(wardId, updateWard)
    .then(() => {
        res.status(200).send({status: "Ward updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
   
})

/*
router.route("/deleteward/:id").delete(async (req,res) => {
    let wardId = req.params.id;

    await Ward.findByIdAndDelete(wardId)
    .then(() => {
        res.status(200).send({status: "Ward deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with delete ward", error: err.message});
    })
})
*/

router.route("/deleteward/:id").delete((req,res)=>{

    let wardId = req.params.id;

    Ward.findByIdAndDelete(wardId).then(()=>{
        res.json("Delete Successfully");
    }).catch((err)=>{
        console.log(err);
    })

})


router.route("/getward/:id").get(async (req,res) => {
    let wardId = req.params.id;
    const ward = await Ward.findById(wardId).then((ward) => {
        //res.status(200).send({status: "Ward fetched", ward})
        res.json(ward);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with get ward", error: err.message});
    })
    
})


module.exports = router;