const { use } = require("passport");
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

async function updateUser(
  id,
  firstName,
  lastName,
  username,
  password,
  membership
) {
  await pool.query(
    "UPDATE users SET firstName = $1, lastName = $2, username = $3, password = $4, membership = $5 WHERE id = $6",
    [firstName, lastName, username, password, membership, id]
  );
}

module.exports = {
  insertUser,
  getUserByUsername,
  getUserById,
  updateUser,
};
