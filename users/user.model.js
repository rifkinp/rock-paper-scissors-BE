const md5 = require('md5');
const db = require('../db/models');
const { Op } = require('sequelize'); 

const userList = [];

class userModel {
    // cek all user
    getAllUser = async () => {
        const userList = await db.User.findAll({include: [db.UserBio, db.GameHistory]});
        console.log(userList);
        return userList;
    };
    
    // cek single user
    getSingleUser = async (idUser) => {
        return await db.User.findOne({ where: { id: idUser }});
    }

    //Cek detail biodata
    getProfileUser = async (idUser) => {
        return await db.User.findOne({
            where: { id: idUser },
            include: [db.UserBio],
        });
        };

    //update single user
    updateSingleUser = async (fullName, address,phoneNumber, idUpdate) => {
        console.log(idUpdate)
        const [UserBio, created] = await db.UserBio.upsert({
            id:idUpdate,
            fullName:fullName,
            phoneNumber:phoneNumber,
            address:address,
            user_id:idUpdate,
        });
        return UserBio;
    }

    // cek user sudah terdaftar atau tidak
    isUserAvail = async (queryUser) => {
        const availUser = await db.User.findOne({
            where: {
                [Op.or]: [
                {username: queryUser.username,},
                {email: queryUser.email,},
            ]},
        })

        if (availUser) {
        return true}
        else {return false}
      };

    // push registrasi  
    recordNewData = (queryUser) => {
        db.User.create({
        username: queryUser.username,
        email: queryUser.email,
        password: md5(queryUser.password),
        })
        console.log(db.User.create)
    };
     
    // Cek Login
    // checkUserLogin = async (username, email, password) => {
    //     const dataUser = await db.User.findOne({
    //         where : {email: email, password: md5(password)},
    //     });
    // return dataUser;
    // }

    checkUserLogin = async (userOrEmail, password) => {
        const dataUser = await db.User.findOne({
          where: {
            [Op.or]: [{ username: userOrEmail }, { email: userOrEmail }],
            password: md5(password), 
            },
            attributes: {exclude: ['password']},
            raw: true
        });
        return dataUser;
      }

    //update single user
    updateGameResult = async (resultGame, gameName, idUser) => {
       const userGame = await db.GameHistory.create({
        status:resultGame,
        user_id:idUser,
        game_name:gameName,
       })
       return userGame;
    }

    //Cek history single ID 
    dataGameHistory = async (idUser) => {
        return await db.User.findOne({ 
            where: { id: idUser },
            include: [db.GameHistory],
        });
    } 

}

module.exports = new userModel;