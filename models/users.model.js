var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
   firstName: String,
   lastName: String,
   email: String,
   decks: [{
      type: Schema.Types.ObjectId,
      ref: "deck"
   }]
});
userSchema.statics = {
   createNew(item) {
		return this.create(item);
   },
   findUserByID(id){
      return this.findById(id).exec();
   },
   findUserByIdAndUpdate(id, data){
      return this.findByIdAndUpdate(id, data).exec();
   }
}
let userModel = mongoose.model("user", userSchema);
module.exports = userModel;