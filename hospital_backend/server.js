const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB Connection Success!");
})

const doctorRouter = require("./routes/doctors.js");

app.use("/doctor", doctorRouter);

const prescriptRouter = require("./routes/prescript.js");

app.use("/prescription", prescriptRouter);

//routes of tharindu

const paymentRouter = require("./routes/payments.js");

app.use("/payment",paymentRouter);


const wardRouter = require("./routes/wards.js");

app.use("/ward",wardRouter);

//routes of sudeepa

const userRouter = require("./routes/userRoute.js");
 app.use("/user",userRouter); 

 const patientRouter = require("./routes/patientRoute.js");
 app.use("/patient",patientRouter); 

 //routes of sahan

 const labRouter =require("./routes/labs.js");
 app.use("/lab",labRouter);

 const vaccineRouter =require("./routes/vaccines.js");
 app.use("/vaccine",vaccineRouter);

// routes of dilmi

const medicineRouter = require("./routes/medicines");
app.use("/medicine",medicineRouter);

const stockRouter = require("./routes/stocks.js");
app.use("/stock",stockRouter);

//routes of heshan

const appointmentRouter=require("./routes/appointments.js");
app.use("/appointment",appointmentRouter);
 
app.listen(PORT, () => {
    console.log('Server is up and running on port number: ${PORT}')
})

