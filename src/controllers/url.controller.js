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

    await urlServices.incrementVisitCountByUrlId(shortenedUrl.id);

    res.redirect(shortenedUrl.url);
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Could not open url');
  }
}

async function deleteUrl(req, res) {
  const id = parseInt(req.params.id);
  const { user } = res.locals;

  try {
    const shortenedUrl = await urlServices.getShortenedUrlById(id);

    if (!shortenedUrl) {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }

    if (shortenedUrl.userId !== user.id) {
      res.sendStatus(httpStatus.UNAUTHORIZED);
      return;
    }

    await urlServices.deleteUrlById(id);

    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Could not delete url');
  }
}

export default { shortUrl, getUrl, openUrl, deleteUrl };
