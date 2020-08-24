const { mongoose } = require(".");

module.exports = mongoose => {
    const Category = mongoose.model(
        "category", mongoose.Schema({
            name: String,
            imageUrl: String,
            slag: String
        })
    )
    return Category;
}