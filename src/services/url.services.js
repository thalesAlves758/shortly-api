import { nanoid } from 'nanoid';

import urlRepository from '../repositories/url.repository.js';

async function shortUrl(url, userId) {
  const shortenedUrl = nanoid();

  await urlRepository.create(url, shortenedUrl, userId);

  return shortenedUrl;
}

async function getShortenedUrlById(id) {
  return urlRepository.findById(id);
}

export default { shortUrl, getShortenedUrlById };
