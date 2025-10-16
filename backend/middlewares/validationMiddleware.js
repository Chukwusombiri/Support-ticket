const Joi = require('joi');
const mongoose = require('mongoose');

// Define the ticket validation schema
const ticketSchema = Joi.object({
  product: Joi.string().valid('Iphone 17', 'Galaxy Fold', 'Macbook Pro', 'Dell XPS', 'Surface Pro').required(),
  description: Joi.string().required(),
  //assignedTo: Joi.string().hex().length(24), // Assuming MongoDB ObjectId
});

// NOTE VALIDATION SCHEMA
const noteSchema = Joi.object({
  text: Joi.string().required()
})

// validate ticket before it get to controller 
// @method ['PUT', 'POST']
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


// validate objectID 
// @method ['GET', 'PUT', 'DELETE']
function validateObjectId(...paramNames) {
  const args = paramNames.length > 0 ? paramNames : ['id'];

  return (req, res, next) => {
    const invalidParams = args.filter(p => {
      const val = req.params[p];
      return !val || !mongoose.Types.ObjectId.isValid(val);
    });

    if (invalidParams.length > 0) {
      return res.status(400).json({
        message: `Invalid ObjectId in parameters: ${invalidParams.join(', ')}`,
      });
    }

    next();
  };
}


// validate note
// @method ['POST']
function validateNote(req, res, next){
  const {body} = req;

  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({ message: "Empty note was submitted" });
  }

  const { error } = noteSchema.validate(body)
  if(error){
    return res.status(401).json({message: (error.details[0].message).toString()})
  }

  next();
}

module.exports = {
  validateTicket,
  validateObjectId,
  validateNote
}