import mongoose from 'mongoose';
const {Schema} = mongoose;

const UserScheme=new Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
})

const USerModel=mongoose.model('user',UserScheme);

export default USerModel;