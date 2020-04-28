const express = require("express");
import { validateParams, schemas } from "../helper/route.helper";
import userCTL from "../controllers/users.ctl";
const router = require("express-promise-router")();
router.route("/")
   .get(userCTL.homePage)
   .post(userCTL.createNew);

router.route("/:userID")
   .get( validateParams(schemas.checkIdSchema, "userID") , userCTL.getUserByID)
   .put(userCTL.replaceUser)
   .patch(userCTL.updateUser);

router.route("/:userID/decks")
   .get(userCTL.getUserDecks)
   .post(userCTL.newUserDeck);

module.exports = router;
