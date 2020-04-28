var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deckSchema = new Schema({
   name: String,
   description: String,
   total: {
      type: Number,
      default: 0,
   },
   owner: {
      type: Schema.Types.ObjectId,
      ref: "user"
   }
});
deckSchema.statics = {
   createNew(item) {
		return this.create(item);
   },
}
module.exports = mongoose.model("deck", deckSchema);