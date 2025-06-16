const pool = require("../config/db");

const createProfile = async ({ user_id, bio, address, avatar, phone }) => {
  const query = `INSERT INTO profiles (user_id, bio, address, avatar, phone)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `;

  const values = [user_id, bio, address, avatar, phone];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  createProfile,
};
