import connection from '../config/database/pg.js';

async function create(url, shortenedUrl, userId) {
  await connection.query(
    `
    INSERT INTO shortened_urls (url, short_url, user_id)
    VALUES ($1, $2, $3)
  `,
    [url, shortenedUrl, userId]
  );
}

async function findById(id) {
  const {
    rows: [shortenedUrl],
  } = await connection.query(
    `
    SELECT id, short_url AS "shortUrl", url, visit_count AS "visitCount", user_id AS "userId", created_at AS "createdAt"
    FROM shortened_urls
    WHERE id = $1
  `,
    [id]
  );

  return shortenedUrl;
}

async function findByShortUrl(shortUrl) {
  const {
    rows: [shortenedUrl],
  } = await connection.query(
    `
    SELECT id, short_url AS "shortUrl", url, visit_count AS "visitCount", user_id AS "userId", created_at AS "createdAt"
    FROM shortened_urls
    WHERE short_url = $1
  `,
    [shortUrl]
  );

  return shortenedUrl;
}

async function incrementVisitCountById(id, quantity) {
  await connection.query(
    `
    UPDATE shortened_urls
    SET visit_count = visit_count + $1
    WHERE id = $2
  `,
    [quantity, id]
  );
}

export default { create, findById, findByShortUrl, incrementVisitCountById };
