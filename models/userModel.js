const { PrismaClient } = require("../generated/prisma");
const pool = require("../config/db");
const prisma = new PrismaClient();

const createUser = async ({ name, email, password, role = "user", image }) => {
  return await prisma.users.create({
    data: {
      name,
      email,
      password,
      role,
      image,
    },
  });
};

const getAllUsers = async (limit, offset, search = "", role = "") => {
  const users = await prisma.users.findMany({
    where :{
      AND : [
        {
          OR : [
            {name : {contains: search, mode: "insensitive"}},
            {email : {contains: search, mode: "insensitive"}}
          ]
        },
        role ? { role : {contains: role, mode: "insensitive"}} : {}
      ]
    },
    orderBy: {
      id: "asc"
    },
    skip: offset,
    take:limit,
    select: {
      id: true,
      name:true,
      email: true,
      role: true
    }
  })

  return users
}


const getUserByID = async (id) => {
  const result = await prisma.users.findUnique({
    where : {
      id: parseInt(id)
    }
  })

  return result;
}



const getUsersCount = async (search = "", role = "") => {
  const count = await prisma.users.count({
    where: {
      AND: [
        {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        },
        role ? { role: { contains: role, mode: "insensitive" } } : {},
      ],
    },
  });
  return count;
}



const deleteUserByID = async (id) => {
  const result = await pool.query(
    `DELETE FROM USERS WHERE ID = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  return await prisma.users.findFirst({
    where: { email },
  });
};


module.exports = {
  createUser,
  getAllUsers,
  getUserByID,
  deleteUserByID,
  getUserByEmail,
  getUsersCount,
};
