const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({

    did : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    contact : {
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    speciality : {
        type : String,
        required : true
    }

})

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports= Doctor;