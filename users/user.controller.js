const userModel = require("./user.model");
const jwtApp = require("jsonwebtoken");
const {matchedData} = require("express-validator");
require("dotenv").config();

class userController {
  dataUser = async (req, res) => {
    try {
      const allUser = await userModel.getAllUser();
      return res.json(allUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Error retrieving user data"});
    }
  };

  userRegister = async (req, res) => {
    try {
      const requestData = matchedData(req); // Test record data in express-validator
      const hasilData = await userModel.isUserAvail(requestData); // check data in database
      if (hasilData) {
        return res.send({message: "User / Email not available"});
      }
      // Record data to database
      userModel.recordNewData(requestData);
      return res.json({message: "Registration success"});
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Error registering user"});
    }
  };

  // login check
  userLogin = async (req, res) => {
    try {
      const {userOrEmail, password} = req.body;
      const hasilLogin = await userModel.checkUserLogin(userOrEmail, password);

      if (hasilLogin) {
        // Generate JWT with token
        const token = jwtApp.sign(
          {...hasilLogin, role: "player"},
          process.env.SECRET_KEYS,
          {expiresIn: "1d"}
        );
        return res.json({accessToken: token});
      } else {
        return res.json({message: "Credential not found"});
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Error logging in user"});
    }
  };

  // check user detail
  userDetail = async (req, res) => {
    try {
      const {idUser} = req.params;
      const users = await userModel.getProfileUser(idUser);

      if (users) {
        return res.json(users);
      } else {
        return res.status(400).json({message: `User ${idUser} not found`});
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Error retrieving user detail"});
    }
  };

  // Update User Profile
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
      return res.status(500).json({message: "Error updating user profile"});
    }
  };
}

module.exports = new userController();
