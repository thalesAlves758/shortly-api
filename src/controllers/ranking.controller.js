import rankingServices from '../services/ranking.services.js';
import httpStatus from '../utils/httpStatus.js';

async function getRanking(req, res) {
  try {
    const ranking = await rankingServices.getRanking();

    res.send(ranking);
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Could not get ranking');
  }
}

export default { getRanking };
