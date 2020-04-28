import Joi from "@hapi/joi";

const validateParams = (schema, name) => {
   return (req, res, next) => {
      console.log('schema=  ', schema);
      console.log('name=  ', name);
   }
};
const schemas = {
   checkIdSchema: Joi.object().keys({
      userID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
   }),
};
module.exports = {
   validateParams,
   schemas,
};
