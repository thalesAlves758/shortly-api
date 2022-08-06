import connection from '../config/database/pg.js';

async function findByEmail(email) {
  const {
    rows: [user],
  } = await connection.query(
    `
    SELECT id, name, password, created_at AS "createdAt"
    FROM users
    WHERE email = $1
  `,
    [email]
  );

  return user;
}

async function create(name, email, password) {
  await connection.query(
    `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
  `,
    [name, email, password]
  );
}

async function findBySession(session) {
  const {
    rows: [user],
  } = await connection.query(
    `
    SELECT users.id, users.name, users.password, users.created_at AS "createdAt"
    FROM sessions
    JOIN users ON sessions.user_id = users.id
    WHERE sessions.session = $1
  `,
    [session]
  );

  return user;
}

async function findUserUrls(userId) {
  const {
    rows: [userUrls],
  } = await connection.query(
    `
    SELECT
    users.id,
    users.name,
    SUM(shortened_urls.visit_count)::integer AS "visitCount",
    ARRAY(
      SELECT row_to_json(shortened_urls_row)
      FROM (
        SELECT shortened_urls.id, shortened_urls.short_url AS "shortUrl", shortened_urls.url, shortened_urls.visit_count AS "visitCount"
        FROM shortened_urls
        WHERE shortened_urls.user_id = users.id
        ORDER BY shortened_urls.id
      ) shortened_urls_row
    ) AS "shortenedUrls"
    FROM users
    JOIN shortened_urls ON shortened_urls.user_id = users.id
    WHERE users.id = $1
    GROUP BY users.id;
  `,
    [userId]
  );

  return userUrls;
}

async function getUsersUrlsRanking() {
  const { rows: usersUrls } = await connection.query(`
    SELECT
      users.id,
      users.name,
      COUNT(shortened_urls.id)::integer as "linksCount",
      COALESCE(SUM(shortened_urls.visit_count), 0)::integer as "visitCount"
    FROM users
    LEFT JOIN shortened_urls ON shortened_urls.user_id = users.id
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10
  `);

  return usersUrls;
}

export default {
  findByEmail,
  create,
  findBySession,
  findUserUrls,
  getUsersUrlsRanking,
};
