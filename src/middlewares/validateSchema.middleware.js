import signInSchema from '../schemas/signIn.schema.js';
import signUpSchema from '../schemas/signUp.schema.js';
import httpStatus from '../utils/httpStatus.js';

function getSchemaByPath(path) {
  switch (path) {
    case '/sign-up':
      return signUpSchema;

    case '/signin':
      return signInSchema;

    default:
      return null;
  }
}

function validateRequest(req, res, next) {
  const schema = getSchemaByPath(req.path);

  if (schema) {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    });

    if (error) {
      res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .send(
          `Validation error: ${error.details
            .map((currentError) => currentError.message)
            .join(', ')}`
        );

      return;
    }

    req.body = value;
  }

  next();
}

export default validateRequest;
