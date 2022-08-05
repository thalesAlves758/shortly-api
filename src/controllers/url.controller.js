import urlServices from '../services/url.services.js';
import httpStatus from '../utils/httpStatus.js';

async function shortUrl(req, res) {
  const { url } = req.body;
  const { user } = res.locals;

  try {
    const shortenedUrl = await urlServices.shortUrl(url, user.id);

    res.send({ shortUrl: shortenedUrl });
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Could not short url');
  }
}

async function getUrl(req, res) {
  const urlId = parseInt(req.params.id);

  try {
    const shortenedUrl = await urlServices.getShortenedUrlById(urlId);

    if (!shortenedUrl) {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }

    const { id, shortUrl: shortenedUrlId, url } = shortenedUrl;

    res.send({
      id,
      shortUrl: shortenedUrlId,
      url,
    });
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Could not find url');
  }
}

async function openUrl(req, res) {
  const { shortUrl: shortenedUrlId } = req.params;

  try {
    const shortenedUrl = await urlServices.getShortenedUrlByShortUrl(
      shortenedUrlId
    );

    if (!shortenedUrl) {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }

    res.redirect(shortenedUrl.url);
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Could not open url');
  }
}

export default { shortUrl, getUrl, openUrl };
