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

const getProfileByUserID =  async(user_id) => {
    const result = await pool.query(`SELECT * FROM profiles WHERE user_id = $1`,[user_id])
    return result.rows[0]
}
const getAllProfiles = async () => {
  const result = await pool.query(
    `SELECT  users.name, users.email, profiles.* FROM profiles JOIN users ON profiles.user_id = users.id`
  );
  return result.rows;
};

const updateProfile = async (userId, { bio, address, phone, avatar }) => {
  const result = await pool.query(
    `UPDATE profiles 
     SET bio = $1, address = $2, phone = $3, avatar = COALESCE($4, avatar)
     WHERE user_id = $5 RETURNING *`,
    [bio, address, phone, avatar, userId]
  );
  return result.rows[0];
};

const deleteProfile = async(id) => {
    const result = await pool.query(
      `DELETE from profiles WHERE user_id = $1 RETURNING *`,[id]
    );
    return result.rows[0];
}


module.exports = {
  createProfile,
  getProfileByUserID,
  getAllProfiles,
  updateProfile,
  deleteProfile
  
};
