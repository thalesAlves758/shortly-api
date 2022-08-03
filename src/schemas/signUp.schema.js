import Joi from 'joi';

const signUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')),
});

export default signUpSchema;
