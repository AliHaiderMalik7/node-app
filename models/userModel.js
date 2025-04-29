const pool = require("../config/db");

const createUser = async ({ name, email, password }) => {
  const query = `INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
    `;

  const values = [name, email, password];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getAllUsers = async () => {
    const result = await pool.query(`SELECT * FROM USERS ORDER BY id ASC`)
    return result.rows
}

const getUserByID = async (id) => {
  const result = await pool.query(`SELECT * FROM USERS WHERE ID = $1`,[id])
  return result.rows[0]
}

const deleteUserByID = async (id) => {
  const result = await pool.query(`DELETE FROM USERS WHERE ID = $1 RETURNING *`, [id]);
  return result.rows[0];
};


module.exports = {
  createUser,
  getAllUsers,
  getUserByID,
  deleteUserByID,
};