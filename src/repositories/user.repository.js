import connection from '../config/database/pg.js';

async function findByEmail(email) {
  const {
    rows: [user],
  } = await connection.query(
    `
    SELECT id, name, email
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

export default { findByEmail, create };
