const dbConfig = require("../config/db.config")
const mongoose = require("mongoose")
mongoose.Promise = global.Promise;
const db = {}
db.mongoose = mongoose;
db.url = dbConfig.url;
db.categories = require("./category.model.js")(mongoose);
db.products = require("./product.model.js")(mongoose);
db.faqs = require("./faq.model.js")(mongoose);

db.users = require('./user.model.js')(mongoose);
db.carts = require('./cart.model.js')(mongoose);
module.exports = db;
module.exports = db;


module.exports = db;

