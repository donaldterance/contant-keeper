import { check, validationResult } from 'express-validator';
export const validationRules = (valType) => {
  return async (req, res, next) => {
    let valArray = getValidations(valType);

    await Promise.all(valArray.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({
      errors: extractedErrors,
    });
  };
};

function getValidations(valType) {
  switch (valType) {
    case 'users':
      return [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check(
          'password',
          'Please enter password with 6 or more characters'
        ).isLength({ min: 6 }),
      ];

    case 'contacts':
      return [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'valid email').optional().isEmail(),
      ];
  }
}
