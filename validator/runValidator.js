const { validationResult } = require("express-validator");

exports.runValidation = (req, res, next) => {
  const errorFormatter = ({ msg, param }) => {
    return {
      propertyPath: param,
      message: msg,
    };
  };
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    return res.status(422).json({
      violations: result.array(),
    });
  }
  next();
};
