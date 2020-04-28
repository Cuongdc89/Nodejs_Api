import mongoose from "mongoose";
import bluebird from "bluebird";
// connect to mongoodb
let connectDB = () => {
	mongoose.Promise = bluebird;
	let URI = "mongodb://localhost:27017/nodejsAPI";
	return mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });
};

module.exports = connectDB;