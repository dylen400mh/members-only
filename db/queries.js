const pool = require("./pool");

async function insertUser(firstName, lastName, username, password, membership) {
  await pool.query(
    "INSERT INTO users (firstName, lastName, username, password, membership) VALUES ($1, $2, $3, $4, $5)",
    [firstName, lastName, username, password, membership]
  );
}

async function getUserByUsername(username) {
  return await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
}

async function getUserById(id) {
  return await pool.query("SELECT * FROM users WHERE id = $1", [id]);
}

module.exports = {
  insertUser,
  getUserByUsername,
  getUserById,
};
