const md5 = require("md5");
const db = require("../db/models");
// const {Op} = require("sequelize");

class userModel {
  // cek all user
  // getAllUser = async () => {
  //     const userList = await db.User.findAll({
  //         include: [db.UserBio],
  //         attributes: {exclude: ["password"]},
  //     });
  //     return userList;
  // };

  getAllUser = async () => {
    const userList = await db.User.findAll({});
    return userList;
  };

  // // cek single user
  // getSingleUser = async idUser => {
  //     try {
  //         return await db.User.findOne({
  //             where: {id: idUser},
  //             attributes: {exclude: ["password"]},
  //         });
  //     } catch (error) {
  //         throw new Error("Failed to get user information: " + error.message);
  //     }
  // };

  // // check detail user bio
  // getProfileUser = async idUser => {
  //     try {
  //         return await db.User.findOne({
  //             where: {id: idUser},
  //             include: [db.UserBio],
  //             attributes: {exclude: ["password"]},
  //         });
  //     } catch (error) {
  //         throw new Error("Failed to get user profile: " + error.message);
  //     }
  // };

  // //update single user
  // updateSingleUser = async (fullName, address, phoneNumber, idUser) => {
  //     try {
  //         const idUpdate = parseInt(idUser);
  //         console.log(idUpdate);
  //         const [UserBio, created] = await db.UserBio.upsert(
  //             {
  //                 id: idUpdate,
  //                 fullName: fullName,
  //                 phoneNumber: phoneNumber,
  //                 address: address,
  //                 user_id: idUpdate,
  //             },
  //             {returning: true}
  //         );
  //         return UserBio;
  //     } catch (error) {
  //         throw new Error("Failed to update user: " + error.message);
  //     }
  // };
  // // cek is registered or not
  // isUserAvail = async queryUser => {
  //     try {
  //         const availUser = await db.User.findOne({
  //             where: {
  //                 [Op.or]: [
  //                     {username: queryUser.username},
  //                     {email: queryUser.email},
  //                 ],
  //             },
  //         });

  //         return availUser ? true : false;
  //     } catch (error) {
  //         throw new Error(
  //             "Failed to check user availability: " + error.message
  //         );
  //     }
  // };

  // // record registration
  // recordNewData = queryUser => {
  //     db.User.create({
  //         username: queryUser.username,
  //         email: queryUser.email,
  //         password: md5(queryUser.password),
  //     });
  // };

  // // Cek Login
  // checkUserLogin = async (userOrEmail, password) => {
  //     try {
  //         const dataUser = await db.User.findOne({
  //             where: {
  //                 [Op.or]: [{username: userOrEmail}, {email: userOrEmail}],
  //                 password: md5(password),
  //             },
  //             attributes: {exclude: ["password"]},
  //             raw: true,
  //         });
  //         return dataUser;
  //     } catch (error) {
  //         throw new Error("Failed to check user login: " + error.message);
  //     }
  // };
}

module.exports = new userModel();
