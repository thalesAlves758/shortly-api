import tokenServices from '../services/token.services.js';
import userServices from '../services/user.services.js';
import httpStatus from '../utils/httpStatus.js';

async function validateUser(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  const jwtDecoded = tokenServices.validateToken(token);
  const sessionUuid = jwtDecoded?.session;

  const user = await userServices.findUserBySession(sessionUuid);

  if (!user) {
    res.sendStatus(httpStatus.UNAUTHORIZED);
    return;
  }

  res.locals = { user };

  next();
}

export default validateUser;
