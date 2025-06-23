const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();




const createProfile = async({ user_id, bio, address, avatar, phone }) => {
  const profiles =  await prisma.profiles.create({
    data: {
      user_id: parseInt(user_id),
      bio,
      address,
      avatar,
      phone,
    },
  })
  return profiles
};

const getProfileByUserID = async (user_id) => {
  const profile = await prisma.profiles.findUnique({
    where: {
      user_id: parseInt(user_id),
    },
  });

  return profile;
};


const getAllProfiles = async () => {
  const profiles = await prisma.profiles.findMany({
    include: {
      users: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return profiles;
};


const updateProfile = async (userId, { bio, address, phone, avatar }) => {
  const updatedProfile = await prisma.profiles.update({
    where: {
      user_id: parseInt(userId),
    },
    data: {
      bio,
      address,
      phone,
      ...(avatar && { avatar }), // only set avatar if provided
    },
  });

  return updatedProfile;
};


const deleteProfile = async (userId) => {
  const deletedProfile = await prisma.profiles.delete({
    where: {
      user_id: parseInt(userId),
    },
  });

  return deletedProfile;
};



module.exports = {
  createProfile,
  getProfileByUserID,
  getAllProfiles,
  updateProfile,
  deleteProfile,
};
