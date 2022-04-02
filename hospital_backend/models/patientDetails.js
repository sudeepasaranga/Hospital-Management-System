const jwt = require('jsonwebtoken');
const mongoose =require('mongoose');
const bcrypt  = require('bcryptjs');
const Schema = mongoose.Schema;

const patientSchema = new Schema({

    pname : {
        type : String,
        required:true
    },
    pemail : {
        type : String,
        required:true
     
    },

    fpassword : { 
        type : String,
        required:true

    },

    cpassword :{
        type : String,
        required : true,
        
    },

     gender : {
        type: String,
        required: true
    },

    phonenum : {
        type : Number,
        required: true

    },
    
    date: {
        type: Date,
        default: Date.now
    }



});





//Hashing Password

patientSchema.pre('save', async function (next){
    console.log("Hi I am pre");
    if(this.isModified('fpassword')){
        console.log("Hi I am pre password");
        this.fpassword = await bcrypt.hash(this.fpassword,12);
        this.cpassword = await bcrypt.hash(this.cpassword,12);
       
    }
    next();
});

// generate token

patientSchema.methods.generateAuthToken = async function (){
    try{
        
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
         this.tokens = this.tokens.concat({token:token});
         await  this.save();
         return token;
    }catch(err){
        console.log(err);
    }
}


const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient; //Export 
