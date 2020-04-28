import userModel from "../models/users.model";
import deckModel from "../models/decks.model";
import Joi from "@hapi/joi";
// // Đã sử dụng package express-promise-router nên ko cần trycatch khi dùng {async, await}

const checkIdSchema = Joi.object().keys({
   userID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
});

let newUserDeck = async (req, res) => {
   let {userID} = req.params;
   const newDeck = new deckModel(req.body);
   const user = await userModel.findUserByID(userID);
   newDeck.owner = user;
   await newDeck.save();
   user.decks.push(newDeck._id);
   await user.save();
   return res.status(201).json({newDeck});
};
let getUserDecks = async (req, res) => {
   let {userID} = req.params;
   const user = await userModel.findById(userID).populate("decks");
   return res.status(200).json({decks: user.decks});
};
let replaceUser = async (req, res) => {
   let {userID} = req.params;
   const newUser = req.body;
   await userModel.findUserByIdAndUpdate(userID, newUser);
   return res.status(200).json({success: true});
};
let updateUser = async (req, res) => {
   let {userID} = req.params;
   const newUser = req.body;
   await userModel.findUserByIdAndUpdate(userID, newUser);
   return res.status(200).json({success: true});
};
let getUserByID = async (req, res) =>{
   const resultValidator = checkIdSchema.validate(req.params);
   console.log('resultValidator=', resultValidator);
   let {userID} = req.params;
   let userInfo = await userModel.findUserByID(userID);
   return res.status(200).json({userInfo});
};

let homePage = async (req, res) => {
   let user = await userModel.find({});
   return res.status(200).json({user});
};
let createNew = async (req, res) => {
   const newUser = {
      firstName:  req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
   }
   let user = await userModel.createNew(newUser);
   return res.status(201).json({user});
};
module.exports = {
   getUserDecks,
   newUserDeck,
   homePage,
   createNew,
   getUserByID,
   replaceUser,
   updateUser,
};
