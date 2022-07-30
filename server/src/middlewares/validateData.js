const Joi = require('joi');

async function validateUserReg(req, res, next) {
  const userRegSchema = Joi.object({
    username: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().min(5).max(100).lowercase().required(),
    password: Joi.string().min(5).max(255).required(),
    passwordConfirm: Joi.string().valid(Joi.ref('password')),
    image: Joi.string().uri().required(),
  });
  try {
    await userRegSchema.validateAsync(req.body, { abortEarly: false });
    console.log('req.body in validate:', req.body);
    next();
  } catch (err) {
    // console.log('err in validateUser middleware:', err);
    console.log('errDetails: ', err.details);
    const message = err.details.map((errObj) => ({
      message: errObj.message,
      field: errObj.path[0],
    }));
    console.log('details message:', message);
    res.status(400).json({ success: false, message });
  }
}

async function validateUserLog(req, res, next) {
  const userLogSchema = Joi.object({
    email: Joi.string().email().min(5).max(100).lowercase().required(),
    password: Joi.string().min(5).max(255).required(),
  });
  try {
    await userLogSchema.validateAsync(req.body, { abortEarly: false });
    console.log('req.body in validate:', req.body);
    next();
  } catch (err) {
    // console.log('err in validateUser middleware:', err);
    console.log('errDetails ===', err.details);
    const message = err.details.map((errObj) => ({
      message: errObj.message,
      field: errObj.path[0],
    }));
    console.log('details message ===', message);
    res.status(400).json({ success: false, message });
  }
}

module.exports = {
  validateUserReg,
  validateUserLog,
};
