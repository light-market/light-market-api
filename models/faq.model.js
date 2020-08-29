const { mongoose } = require(".");

module.exports = mongoose =>{
    const Faq = mongoose.model(
        "faq",mongoose.Schema({
            question : String,
            answer : String,
            author : String,
            specialist: String,
            isShown: String
        })
    )
    return Faq;
}