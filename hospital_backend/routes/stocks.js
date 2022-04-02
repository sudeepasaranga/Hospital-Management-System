const router = require("express").Router();
const { json } = require("body-parser");
let Stock = require("../models/Stock");

http://localhost:8070/stock/add

router.route("/addstock").post((req,res)=>{

    const sid= Number(req.body.sid);
    const m_name = req.body.m_name;
    const s_amount = Number(req.body.s_amount);
    const exp_date = req.body.exp_date;
    const price = req.body.price;

    const newStock = new Stock ({

        sid,
        m_name,
        s_amount,
        exp_date,
        price
    })

    newStock.save().then(()=>{
        res.json("Stock Added")
    }).catch((err)=>{
        console.log(err);
    })
})


router.route("/dis").get((req,res)=>{
    Stock.find().then((stockes)=>{
        res.json(stockes)
    }).catch((err)=>{
        console.log(err)
    })

})


router.route("/up/:id").put(async (req,res) => {
    let SID = req.params.id;
    const {sid, m_name, s_amount, exp_date, price} = req.body;

    const updateStock = {
        sid,
        m_name,
        s_amount,
        exp_date,
        price
    }

    const update = await Stock.findByIdAndUpdate(SID, updateStock)
    .then(() => {
        res.status(200).send({status: "Stock Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })    
})

router.route("/remove/:id").delete(async (req, res) => {
    let SID = req.params.id;

    await Stock.findByIdAndDelete(SID)
    .then(() => {
        res.status(200).send({status: "Stock deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete stock", error: err.message});
    })
})

router.route("/show/:id").get(async (req, res) => {
    let SID = req.params.id;
    const stock = await Stock.findById(SID)
    .then((stock) => {
        //res.status(200).send({status: "Stock fetched", stock})
        res.json(stock);
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get stock", error: err.message});
    })
})

module.exports = router;