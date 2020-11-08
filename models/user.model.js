module.exports = mongoose => {
    const User = mongoose.model(
        "user", mongoose.Schema({
            username: String,
            email: String,
            password: String,
            date : {
                type : Date,
                default : Date.now
            },
            role :{
                type : String,
                default : "user"

            }
        })
    )
    return User;
}