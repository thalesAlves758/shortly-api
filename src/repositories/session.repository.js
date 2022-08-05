import connection from '../config/database/pg.js';

async function create(uuid, userId) {
  await connection.query(
    `
    INSERT INTO sessions (session, "userId")
    VALUES ($1, $2)
  `,
    [uuid, userId]
  );
}

export default { create };
