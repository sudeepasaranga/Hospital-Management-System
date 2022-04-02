const router = require("express").Router();
const lab = require("../models/Lab");
let Lab = require("../models/Lab");

router.route("/add").post((req,res)=>{
    
    const rid = req.body.rid;
    const pid = req.body.pid;
    const pname = req.body.pname;
    const testtype = req.body.testtype;
    const date = req.body.date;
    const rdesc = req.body.rdesc;
    const billid = req.body.billid;

    const newLab = new Lab ({

        rid,
        pid,
        pname,
        testtype,
        date,
        rdesc,
        billid

    })

    newLab.save().then(()=>{
        res.json("lab report Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    Lab.find().then((labs)=>{
        res.json(labs)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async (req, res)=> {
    let userId = req.params.id;
    const {rid, pid, pname, testtype, date, rdesc, billid} = req.body;

    const updateLab = {
        rid,
        pid,
        pname,
        testtype,
        date,
        rdesc,
        billid
    }

    const update = await Lab.findByIdAndUpdate(userId, updateLab)
    .then(() => {
    res.status(200).send({status: "User updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
})

router.route("/delete/:id").delete(async (req,res) => {
    let userId = req.params.id;

    await Lab.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "User deleted"});
    }).catch((err) => {
       console.log(err.message);
       res.status(500).send({status: "Error with delete user", error: err.message});       
    })
})

router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Lab.findById(userId)
    .then((lab) =>{
       // res.status(200).send({status: "User fetched",lab})
      
       res.json(lab);

    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})

module.exports = router;