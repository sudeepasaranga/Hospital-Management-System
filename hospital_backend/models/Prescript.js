const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const presSchema = new Schema({
    presID : {
        type : String,
        required : true
    },
    patientName : {
        type : String,
        required : true
    },
    patientAge : {
        type : Number,
        required : true
    },
    doctorName : {
        type :String,
        required : true
    },
    description : {
        type : String,
        required : true
    }

})

const Prescript = mongoose.model("Prescript", presSchema);

module.exports= Prescript;