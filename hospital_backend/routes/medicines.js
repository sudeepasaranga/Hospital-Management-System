const router = require("express").Router();
let Medicine = require("../models/Medicine");

http://localhost:8070/medicine/add

router.route("/add").post((req,res)=>{
    

    const m_name = req.body.m_name;
    const mid = Number(req.body.mid);
    const m_type = req.body.m_type;
    const m_desc = req.body.m_desc;

    const newMedicine = new Medicine ({

        m_name,
        mid,
        m_type,
        m_desc
    })

    newMedicine.save().then(()=>{
        res.json("Medicine Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//display
router.route("/").get((req,res)=>{
    Medicine.find().then((medicines)=>{
        res.json(medicines)
    }).catch((err)=>{
        console.log(err)
    })

})


router.route("/update/:id").put(async (req,res) => {
    let MID = req.params.id;
    const { m_name, mid, m_type, m_desc} = req.body;

    const updateMedicine = {
        m_name,
        mid,
        m_type,
        m_desc
    }

    const update = await Medicine.findByIdAndUpdate(MID, updateMedicine)
    .then(() => {
        res.status(200).send({status: "Medicine Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })    
})

router.route("/delete/:id").delete(async (req, res) => {
    let MID = req.params.id;

    await Medicine.findByIdAndDelete(MID)
    .then(() => {
        res.status(200).send({status: "Medicine deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete medicine", error: err.message});
    })
})

router.route("/get/:id").get(async (req, res) => {
    let MID = req.params.id;
    const medicine = await Medicine.findById(MID)
    .then((medicine) => {
        //res.status(200).send({status: "Medicine fetched",medicine})
        res.json(medicine);
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get medicine", error: err.message});
    })
})

module.exports = router;