const router = require("express").Router();
let Payment = require("../models/Payment");

router.route("/add").post((req,res)=>{

    const patient_id = req.body.patient_id;
    const patient_name = req.body.patient_name;
    const patient_nic = req.body.patient_nic;
    const p_num = Number(req.body.p_num);
    const ser_obtain = req.body.ser_obtain;
    const amount = Number(req.body.amount);
    const pay_method = req.body.pay_method;
    const date = req.body.date;
    const month = req.body.month;
    const year = req.body.year;
    const time = req.body.time;
  

    const newPayment = new Payment({

        patient_id,
        patient_name,
        patient_nic,
        p_num,
        ser_obtain,
        amount,
        pay_method,
        date,
        month,
        year,
        time

    })

    newPayment.save().then(()=>{
        res.json("Student Added")
    }).catch((err)=>{
        console.log(err);
    })


})

router.route("/").get((req,res)=>{
    Payment.find().then((payments)=>{
        res.json(payments)
    }).catch((err)=>{
        console.log(err);
    })

})


router.route("/update/:id").put(async (req,res) => {
    let billId = req.params.id;
    const {patient_id, patient_name, patient_nic, p_num, ser_obtain, amount, pay_method, date, month, year, time} = req.body;

    const updatePayment = {
        
        patient_id,
        patient_name,
        patient_nic,
        p_num,
        ser_obtain,
        amount,
        pay_method,
        date,
        month,
        year,
        time
    }

    const update = await Payment.findByIdAndUpdate(billId, updatePayment)
    .then(() => {
        res.status(200).send({status: "Bill updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
   
})

/*
router.route("/delete/:id").delete(async (req,res) => {
    let billId = req.params.id;

    await Payment.findByIdAndDelete(billId)
    .then(() => {
        res.status(200).send({status: "Bill deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with delete bill", error: err.message});
    })
})
*/

router.route("/delete/:id").delete((req,res)=>{

    let billId = req.params.id;

    Payment.findByIdAndDelete(billId).then(()=>{
        res.json("Delete Successfully");
    }).catch((err)=>{
        console.log(err);
    })

})




router.route("/get/:id").get(async (req,res) => {
    let billId = req.params.id;
    await Payment.findById(billId).then((payment) => {
        //res.status(200).send({status: "Bill fetched", payment})
        res.json(payment);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with get bill", error: err.message});
    })
    
})


module.exports = router;