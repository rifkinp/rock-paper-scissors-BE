const userModel = require("./user.model");
const jwtApp = require("jsonwebtoken");
const {matchedData} = require("express-validator");

class userController {
    dataUser = async (req, res) => {
        try {
            const allUser = await userModel.getAllUser();
            return res.json(allUser);
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({message: "Error retrieving user data"});
        }
    };

    userRegister = async (req, res) => {
        try {
            const requestData = matchedData(req); // data yang masuk
            const hasilData = await userModel.isUserAvail(requestData); //cek data di database
            if (hasilData) {
                return res.send({message: "User / Email sudah terdaftar"});
            }
            //record data kedalam userList
            userModel.recordNewData(requestData);
            return res.json({message: "registrasi berhasil"});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Error registering user"});
        }
    };

    // Cek Login
    userLogin = async (req, res) => {
        try {
            const {userOrEmail, password} = req.body;
            const hasilLogin = await userModel.checkUserLogin(
                userOrEmail,
                password
            );

            if (hasilLogin) {
                //generate JWT
                const token = jwtApp.sign(
                    {...hasilLogin, role: "player"},
                    "H@McQfTjWnZr4u7x!A%C*F-JaNdRgUkXp2s5v8y/B?E(G+KbPeShVmYq3t6w9z$C",
                    {expiresIn: "1d"}
                );
                return res.json({accessToken: token});
            } else {
                return res.json({message: "Credential tidak ditemukan"});
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Error logging in user"});
        }
    };

    //Cek Detail
    userDetail = async (req, res) => {
        try {
            const {idUser} = req.params;
            const users = await userModel.getProfileUser(idUser);

            if (users) {
                return res.json(users);
            } else {
                return res
                    .status(400)
                    .json({message: `User ${idUser} tidak ditemukan`});
            }
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({message: "Error retrieving user detail"});
        }
    };

    //Update user profile
    userUpdate = async (req, res) => {
        try {
            const {idUser} = req.params;
            const {fullName, address, phoneNumber} = req.body;
            const user = await userModel.getSingleUser(idUser);
            if (!user) {
                return res.status(400).json({message: "User not found"});
            }

            const updatedUser = await userModel.updateSingleUser(
                fullName,
                address,
                phoneNumber,
                idUser
            );

            if (!updatedUser) {
                return res.status(400).json({message: "Failed to update user"});
            }

            return res.json(updatedUser);
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({message: "Error updating user profile"});
        }
    };
}

module.exports = new userController();
