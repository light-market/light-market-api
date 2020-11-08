/*const { mongoose } = require(".");
module.exports = mongoose => {
    var schema =mongoose.Schema({
        type: String,
        name: String,
        description: String,
        imageUrl: String,
        quantity: Number,
        price: Number,
        secondPrice: Number

    });
    schema.method("toJSON",()=>{
        const { __v, _id, ...object } = this.toObject();
        object.id=_id;
        return object;
    });
    const Product = mongoose.model("product",schema)
    return Product;
}*/
module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        type: String,
        name: String,
        description: String,
        imageUrl: String,
        quantity: Number,
        price: Number,
        secondPrice: Number
        
      }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Product = mongoose.model("product", schema);
    return Product;
  };