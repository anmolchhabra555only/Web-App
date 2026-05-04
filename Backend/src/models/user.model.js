const moongose =  require("mongoose");

const userSchema = new moongose.Schema({
  email: String,
  password: String
});

module.exports = moongose.model("user", userSchema);