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

module.exports = {
  getAllMessages,
};