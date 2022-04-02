const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wardSchema = new Schema({

    ward_id : {
        type : String,
        required: true
    },
    ward_name : {
        type : String,
        required: true
    },
    ward_catogory: {
        type : String,
        required: true
    },
    total_bed_amount: {
        type : Number,
        required: true
    },
    empty_beds: {
        type : Number,
        required: true
    }


})

const Ward = mongoose.model("Ward",wardSchema);

module.exports = Ward;