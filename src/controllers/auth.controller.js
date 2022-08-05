import authServices from '../services/auth.services.js';
import userServices from '../services/user.services.js';
import httpStatus from '../utils/httpStatus.js';

async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    const userExists = await userServices.findUserByEmail(email);

    if (userExists) {
      res.sendStatus(httpStatus.CONFLICT);
      return;
    }

    await authServices.signUp(name, email, password);

    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Could not create user');
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const token = await authServices.signIn(email, password);

    if (!token) {
      res.sendStatus(httpStatus.UNAUTHORIZED);
      return;
    }

    res.send({ token });
  } catch (error) {
    console.log(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send('Could not validate user');
  }
}

export default { signUp, signIn };
