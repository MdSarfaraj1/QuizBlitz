
const mongoose=require('mongoose')
const CategorySchema=new mongoose.Schema({
    title:String,
    description:String,
    icon:String,
})
module.exports = mongoose.model('Category', CategorySchema);