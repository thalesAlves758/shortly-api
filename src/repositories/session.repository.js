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

export default { create };
