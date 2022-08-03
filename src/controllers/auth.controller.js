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

    await userServices.createUser(name, email, password);

    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Could not create user');
  }
}

export default { signUp };
