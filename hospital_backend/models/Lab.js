const mongoose = require('mongoose');

const schema = mongoose.Schema;

const labSchema = new schema ({
    
    rid : {
        type : String,
        required : true 
    },

    pname : {
        type : String,
        required: true
    },

    testtype : {
        type : String,
        required: true
    },

    date : {
        type : String,
        required : true
    },

    rdesc : {
        type : String,
        required : true
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

 const Lab = mongoose.model("Lab",labSchema);

 module.exports = Lab;