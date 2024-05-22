
function validateUserData(req, res, next) {
  const { firstName, lastName, password, email, phone } = req.body;
  const errors = [];

  // Validate first name and last name
  if (!/^[A-Z]/.test(firstName)) {
      errors.push('First name must start with an uppercase letter.');
  }
  if (!/^[A-Z]/.test(lastName)) {
      errors.push('Last name must start with an uppercase letter.');
  }

  // Validate password
  const passwordCriteria = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordCriteria.test(password)) {
      errors.push('Password must be at least 8 characters long and contain at least one special character, one uppercase letter, and one number.');
  }

  // Validate email
  if (!/@/.test(email)) {
      errors.push('Email address must contain the "@" symbol.');
  }

  // Validate phone number
  if (!/^\d{10,}$/.test(phone)) {
      errors.push('Phone number must be at least 10 digits long.');
  }

  if (errors.length > 0) {
      const error = new Error('Validation Error');
      error.status = 400;
      error.details = errors;
      return next(error);
  }

  next();
}

function errorHandler(err, req, res, next) {
  res.status(err.status || 500).send({
      error: {
          message: err.message,
          details: err.details || 'Internal Server Error'
      }
  });
}

module.exports = {
  validateUserData,
  errorHandler
};
