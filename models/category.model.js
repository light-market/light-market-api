

/*module.exports = mongoose => {
    const Category = mongoose.model(
        "category", mongoose.Schema({
            name: String,
            imageUrl: String,
            slag: String
        })
    )
    return Category;
}*/
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            imageUrl: String,
            describtion : String,
            slag: String

        }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Category = mongoose.model("category", schema);
    return Category;
};
