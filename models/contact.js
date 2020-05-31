"use strict"
const mongoose=require("mongoose");
const contactschema=new mongoose.Schema({
    Name:String,
    DOB:String,
    numbers:[{type:String}],
    emails:[{type:String}],
});
const contactmodel=mongoose.model('contacts',contactschema);
module.exports=contactmodel;