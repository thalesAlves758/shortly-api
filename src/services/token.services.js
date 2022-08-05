import jwt from 'jsonwebtoken';

function generateToken(payload) {
  const jwtExpiration = 24 * 60 * 60 * 1000; /* eslint-disable-line */

  const jwtSecret = process.env.JWT_SECRET;

  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  });

  return token;
}

export default { generateToken };
