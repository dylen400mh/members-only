const pool = require("./pool");

async function insertUser(firstName, lastName, username, password, membership) {
  await pool.query(
    "INSERT INTO users (firstName, lastName, username, password, membership) VALUES ($1, $2, $3, $4, $5)",
    [firstName, lastName, username, password, membership]
  );
}

module.exports = {
  insertUser,
};
