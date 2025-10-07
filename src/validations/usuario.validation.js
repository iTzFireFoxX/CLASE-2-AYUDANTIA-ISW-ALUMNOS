import Joi from "joi";


export const userValidation = Joi.object({
  email: Joi.string().email().max(255).required().messages({ 
    "any.required": "Debe ingresar un email",
    "string.empty": "El email no puede estar vacio",
    "string.email": "Debe ingresar un email valido"}),

  password: Joi.string().min(8).max(255).required().pattern(/^(?=.*[0-9]).*$/).messages({
    "any.required": "Debe ingresar una contraseña",
    "string.empty": "La contraseña no puede estar vacia",
    "string.min": "La contraseña debe tener al menos 8 caracteres",
    "string.pattern.base": "La contraseña debe tener al menos un numero"}),

}).options({
  allowUnknown: false,
  stripUnknown: true,
});
