const Joi = require('joi');
const mongoose = require('mongoose');

// Define the ticket validation schema
const ticketSchema = Joi.object({
  product: Joi.string().valid('Iphone 17', 'Galaxy Fold', 'Macbook Pro', 'Dell XPS', 'Surface Pro').required(),
  description: Joi.string().required(),
  //assignedTo: Joi.string().hex().length(24), // Assuming MongoDB ObjectId
});

const validateTicket = (req, res, next) => {
  const { body } = req;
  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({ message: "Please fill out the ticket details" });
  }

  const { error } = ticketSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: (error.details[0].message).toString() });
  }
  next();
};

function validateObjectId(paramName = 'id') {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `Invalid request, Use valid credentials or contact site manager` });
    }

    next();
  };
}

module.exports = {
  validateTicket,
  validateObjectId
}