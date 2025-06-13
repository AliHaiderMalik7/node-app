const pool = require("../config/db");

const createUser = async ({ name, email, password,role='user'}) => {
  const query = `INSERT INTO users (name, email, password,role)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;

  const values = [name, email, password,role];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getAllUsers = async (limit, offset, search) => {
  limit = parseInt(limit); 
  offset = parseInt(offset); 

  const result = await pool.query(
    `SELECT id, name, email, role
     FROM users
     WHERE name ILIKE $1 OR email ILIKE $1
     ORDER BY id ASC
     LIMIT $2 OFFSET $3`,
    [`%${search}%`, limit, offset]
  );
  return result.rows;
};


const getUserByID = async (id) => {
  const result = await pool.query(`SELECT * FROM USERS WHERE ID = $1`,[id])
  return result.rows[0]
}

const getUsersCount = async(search) => {
  const result = await pool.query(`SELECT COUNT(*) FROM users WHERE name ILIKE $1 OR email ILIKE $1`,[`%${search}%`]);
  return result.rows[0].count;
}



const deleteUserByID = async (id) => {
  const result = await pool.query(`DELETE FROM USERS WHERE ID = $1 RETURNING *`, [id]);
  return result.rows[0];
};

const getUserByEmail = async (email) => {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    console.log("result returned",result);
    
    return result.rows[0]

}


module.exports = {
  createUser,
  getAllUsers,
  getUserByID,
  deleteUserByID,
  getUserByEmail,
  getUsersCount,
};