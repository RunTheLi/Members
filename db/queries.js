//quesries.js

const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query(`
    SELECT
      messages.id,
      messages.title,
      messages.text,
      messages.timestamp,
      messages.user_id,
      users.first_name,
      users.last_name
    FROM messages
    JOIN users ON messages.user_id = users.id
    ORDER BY messages.timestamp DESC
  `);

  return rows;
}

async function createUser({
  firstName,
  lastName,
  username,
  password,
}) {
  // Temporary debugging: inspect values without printing the password hash
  console.log("createUser received:", {
    firstName,
    lastName,
    username,
    passwordHashLength: password?.length,
  });

  const { rows } = await pool.query(
    `INSERT INTO users (
      first_name,
      last_name,
      username,
      password
    )
    VALUES ($1, $2, $3, $4)
    RETURNING id, first_name, last_name, username`,
    [firstName, lastName, username, password]
  );

  return rows[0];
}

async function getUserByUsername(username) {
  const { rows } = await pool.query(
    `SELECT *
     FROM users
     WHERE username = $1`,
    [username]
  );

  return rows[0];
}

async function getUserById(id) {
    const { rows } = await pool.query(
    "SELECT id, first_name, last_name, username, membership_status, is_admin FROM users WHERE id = $1",
    [id]
  );

  return rows[0];
}

async function createMessage({ title, text, userId }) {
  const { rows } = await pool.query(
    `INSERT INTO messages (title, text, user_id)
     VALUES ($1, $2, $3)
     RETURNING id, title, text, timestamp, user_id`,
     [title, text, userId]
  );
  return rows[0];
}

async function joinClub(userId) {
  const { rows } = await pool.query(
    `UPDATE users
    SET membership_status = TRUE
    WHERE id = $1
    RETURNING id, username, membership_status`, [userId]
  );
  return rows[0];
}

async function deleteMessage(messageId) {
  await pool.query(
    "DELETE FROM messages WHERE id = $1",
    [messageId]
  );
}

module.exports = {
  getAllMessages,
  createUser,
  getUserByUsername,
  getUserById,
  createMessage,
  joinClub,
  deleteMessage
};
