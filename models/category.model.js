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
<<<<<<< HEAD
}
=======
    
}
>>>>>>> 863a73fba888530dac1a8779e040fb333b1b8177
