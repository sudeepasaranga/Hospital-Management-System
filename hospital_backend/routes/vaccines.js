const router = require("express").Router();
const vaccine = require("../models/Vaccine");
let Vaccine = require("../models/Vaccine");

router.route("/add").post((req,res)=>{
    
    const vid = req.body.vid;
    const vname = req.body.vname;
    const vdesc = req.body.vdesc;
    const price = req.body.price;
    const pid = req.body.pid;
    const billid = req.body.billid;

    
    const newVaccine = new Vaccine ({

        vid,
        vname,
        vdesc,
        price,
        pid,
        billid

    })

    newVaccine.save().then(()=>{
        res.json("Vaccine details Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    Vaccine.find().then((vaccines)=>{
        res.json(vaccines)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async (req, res)=> {
    let userId = req.params.id;
    const {vid,vname,vdesc,price,pid,billid} = req.body;

    const updateVaccine = {
        vid,
        vname,
        vdesc,
        price,
        pid,
        billid

    }

    const update = await Vaccine.findByIdAndUpdate(userId, updateVaccine)
    .then(() => {
    res.status(200).send({status: "User updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
})

router.route("/delete/:id").delete(async (req,res) => {
    let userId = req.params.id;

    await Vaccine.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "User deleted"});
    }).catch((err) => {
       console.log(err.message);
       res.status(500).send({status: "Error with delete user", error: err.message});       
    })
})

router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Vaccine.findById(userId)
    .then((vaccine) =>{
     //   res.status(200).send({status: "User fetched"},vaccine)

     res.json(vaccine);

    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})

module.exports = router;