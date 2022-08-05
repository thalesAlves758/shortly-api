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

export default { findByEmail, create, findBySession };
