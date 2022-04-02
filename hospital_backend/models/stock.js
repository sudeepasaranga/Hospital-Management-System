const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stockSchema = new Schema({
    sid :{
        type : Number,
        required: true
    },
    m_name :{
        type: String,
        required: true
    },
    s_amount :{
        type: Number,
        required: true
    },
    exp_date :{
        type: String,
        required: true
    },
    price :{
        type: String,
        required: true
    }

})

const Stock = mongoose.model("Stock",stockSchema);

module.exports = Stock;