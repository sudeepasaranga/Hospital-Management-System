const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const medicineSchema = new Schema({

m_name  : {
    type : String,
    required: true
},
mid : {
    type: Number,
    required: true
},
m_type : {
    type : String,
    required: true
},
m_desc : {
    type : String,
    required: true
}
  
})

const Medicine = mongoose.model("Medicine",medicineSchema);

module.exports = Medicine;