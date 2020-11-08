const { mongoose } = require(".");
/*
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

}*/
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            question: String,
            answer: String,
            author: String,
            specialist: String,
            isShown: String
        }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Faq = mongoose.model("faq", schema);
    return Faq;
};


    
}

