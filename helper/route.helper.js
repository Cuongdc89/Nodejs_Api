import Joi from "@hapi/joi";

const validateParams = (schema, name) => {
   return (req, res, next) => {
      const validateResult = schema.validate({param: req.params[name]});
      if(validateResult.error){
         return res.status(400).json(validateResult.error);
      }else{
         if(!req.value){req.value = {}}
         if(!req.value["params"]){req.value.params = {}}
         req.value.params[name] = req.params[name];
         next();
      }
   }
}; 
const schemas = {
   checkIdSchema: Joi.object().keys({
      param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
   }),
};
module.exports = {
   validateParams,
   schemas,
};
