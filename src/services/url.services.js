import { nanoid } from 'nanoid';

import urlRepository from '../repositories/url.repository.js';

const DEFAULT_QUANTITY_INCREMENT = 1;

async function shortUrl(url, userId) {
  const shortenedUrl = nanoid();

  await urlRepository.create(url, shortenedUrl, userId);

  return shortenedUrl;
}

async function getShortenedUrlById(id) {
  return urlRepository.findById(id);
}

async function getShortenedUrlByShortUrl(shortUrlId) {
  return urlRepository.findByShortUrl(shortUrlId);
}

async function incrementVisitCountByUrlId(
  id,
  quantity = DEFAULT_QUANTITY_INCREMENT
) {
  await urlRepository.incrementVisitCountById(id, quantity);
}

export default {
  shortUrl,
  getShortenedUrlById,
  getShortenedUrlByShortUrl,
  incrementVisitCountByUrlId,
};
