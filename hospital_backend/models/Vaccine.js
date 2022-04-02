const mongoose = require('mongoose');

const schema = mongoose.Schema;

const vaccineSchema = new schema ({
    
    vid : {
        type : String,
        required : true 
    },

    vname : {
        type : String,
        required: true
    },

    vdesc : {
        type : String,
        required : true
    },

    price : {
        type : String,
        required: true
    },


    pid : {
        type : String,
        required : true
    },

    billid : {
        type : String,
        required : true
    }

})
 const Vaccine = mongoose.model("Vaccine",vaccineSchema);

 module.exports = Vaccine;