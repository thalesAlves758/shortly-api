import connection from '../config/database/pg.js';

async function create(uuid, userId) {
  await connection.query(
    `
    INSERT INTO sessions (session, user_id)
    VALUES ($1, $2)
  `,
    [uuid, userId]
  );
}

async function find(uuid) {
  const {
    rows: [session],
  } = await connection.query(
    `
    SELECT id, session, user_id AS "userId", created_at AS "createdAt"
    FROM sessions
    WHERE session = $1
  `,
    [uuid]
  );

  return session;
}

export default { create, find };
