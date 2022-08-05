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

export default { create, findById };
