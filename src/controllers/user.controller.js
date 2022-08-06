import userServices from '../services/user.services.js';
import httpStatus from '../utils/httpStatus.js';

async function getUrls(req, res) {
  const { user } = res.locals;

  try {
    const userUrls = await userServices.findUserUrls(user.id);

    if (!userUrls) {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }

    res.send(userUrls);
  } catch (error) {
    console.log(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send('Could not get user urls');
  }
}

export default { getUrls };
