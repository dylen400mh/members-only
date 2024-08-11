const { Client } = require("pg");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
firstName VARCHAR(255),
lastName VARCHAR(255),
username VARCHAR(255),
password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS messages (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
title VARCHAR(255),
text VARCHAR(255),
timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
userid INTEGER REFERENCES users(id)
)

`;

async function seedData(client) {
  const users = [
    {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      password: "password123",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      username: "janesmith",
      password: "password456",
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      username: "alicej",
      password: "password789",
    },
  ];

  // Loop through each user, hash their password, and insert into the database
  for (let user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const insertUserQuery = `
      INSERT INTO users (firstName, lastName, username, password)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;

    const res = await client.query(insertUserQuery, [
      user.firstName,
      user.lastName,
      user.username,
      hashedPassword,
    ]);

    const userId = res.rows[0].id;

    const insertMessageQuery = `
      INSERT INTO messages (userid, title, text)
      VALUES ($1, $2, $3);
    `;

    await client.query(insertMessageQuery, [
      userId,
      `Welcome!`,
      `Welcome ${user.firstName} ${user.lastName}!`,
    ]);
  }
}

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.argv[2],
  });
  await client.connect();
  await client.query(SQL);
  await seedData(client);
  await client.end();
  console.log("done");
}

main();
