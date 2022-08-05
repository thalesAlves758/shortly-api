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

export default { create };
