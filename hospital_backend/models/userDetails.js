const jwt = require('jsonwebtoken');
const mongoose =require('mongoose');
const bcrypt  = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema =new Schema({

    uid : {
        type : String,
        required:true
    },
    uname : {
        type : String,
        required:true
     
    },

    email : { 
        type : String,
        required:true

    },

    password :{
        type : String,
        required : true,
        
    },

     usertype : {
        type: String,
        required: true
    },

    phone : {
        type : String,
        required: true

    },
    resetToken:{
            String,
            expireToken:Date,
    },
    tokens: [
        {
            token : {
                type : String,
                required: true
            }
        }
    ]

});





//Hashing Password

userSchema.pre('save', async function (next){
    console.log("Hi I am pre");
    if(this.isModified('password')){
        console.log("Hi I am pre password");
        this.password = await bcrypt.hash(this.password,6);
       
    }
    next();
});

// generate token

userSchema.methods.generateAuthToken = async function (){
    try{
        
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
         this.tokens = this.tokens.concat({token:token});
         await  this.save();
         return token;
    }catch(err){
        console.log(err);
    }
}

const User = mongoose.model("User", userSchema);
module.exports = User; //Export 
