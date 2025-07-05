
const mongoose=require('mongoose')
const CategorySchema=new mongoose.Schema({
    title:String,
    description:String,
    icon:String,
    totalQuizzes:{type:Number,default:0},
})
module.exports = mongoose.model('Category', CategorySchema);