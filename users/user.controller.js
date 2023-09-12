/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
const PDFDocument = require('pdfkit');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const userModel = require('./user.model');
const judgementRPS = require('../utils/judgementValidation');
const { bucket } = require('../config/firebase');
require('dotenv').config();

class UserController {
  getAllUser = async (req, res) => {
    try {
      const allUser = await userModel.getAllUser();
      return res.json(allUser);
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      return res.json({ message: 'Internal Server Error' });
    }
  };

  registerNewUser = async (req, res) => {
    const userData = req.body;
    try {
      const existUser = await userModel.isUserExist(userData);
      if (existUser) {
        res.statusCode = 400;
        return res.json({ message: 'Username atau Email sudah terdaftar' });
      }

      userModel.registerNewUser(userData);
      return res.json({ message: 'User Baru telah Terdaftar' });
    } catch (error) {
      res.statusCode = 400;
      console.log(error);
      return res.json({ message: 'ada error di controller registerUser' });
    }
  };

  loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
      const dataLogin = await userModel.loginUser(username, password);

      if (dataLogin) {
        // NYALAKAN JWT
        const token = jwt.sign(dataLogin, process.env.SECRET_KEY);

        // if (dataLogin) {
        //   // NYALAKAN JWT
        //   const token = jwt.sign(dataLogin, process.env.SECRET_KEY, {
        //     expiresIn: '1d',
        //   });

        return res.json({ accessToken: token });
      }
      return res.status(400).json({ message: 'User tidak ditemukan' });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: 'Ada yang salah di controller login' });
    }
  };

  uploadProfile = async (req, res) => {
    const token = req.token.id;
    const { link } = req.body;

    const profileExist = await userModel.isProfileExist(token);
    try {
      if (profileExist) {
        await userModel.updateProfile(link, token);
        return res.json({ message: 'Profile Updated' });
      }
      await userModel.uploadProfile(link, token);
      return res.json({ message: 'Profile Uploaded' });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: 'Ada yang salah di controller uploadProfile' });
    }
  };

  // eslint-disable-next-line consistent-return
  updateUserBio = async (req, res) => {
    // dapatkan userId dari param
    const token = req.token.id;
    const {
      fullname, address, phoneNumber, profilePicture,
    } = req.body;
    // pastikan data yang dimasukan sesuai syarat

    // cek apakah data sudah ada atau belum
    const bioExist = await userModel.isUserBioExist(token);
    try {
      if (bioExist) {
        // jika userId sudah terdaftar update biodata
        userModel.updateUserBio(
          token,
          fullname,
          address,
          phoneNumber,
          profilePicture,
        );
        return res.json({ message: 'Biodata sudah di update' });
      }
      // jika userId tidak ada di db buatkan biodata baru
      userModel.registerUserBio(
        token,
        fullname,
        address,
        phoneNumber,
        profilePicture,
      );
      return res.json({ message: 'Biodata sudah di buat' });
    } catch (error) {
      console.log(error);
      res.statusCode = 400;
      res.json({ message: 'error try catch controller updateUserBio' });
    }
  };

  findUser = async (req, res) => {
    const token = req.token.id;

    try {
      const dataUser = await userModel.findUser(token);
      return res.json({ dataUser });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: ' ada yang salah di controller findUser' });
    }
  };

  createRoom = async (req, res) => {
    const player1 = req.body;
    const token = req.token.id;

    try {
      if (
        player1.choicePlayer1 !== 'batu'
        && player1.choicePlayer1 !== 'kertas'
        && player1.choicePlayer1 !== 'gunting'
      ) {
        return res
          .status(400)
          .json({ message: 'Format harus berupa batu / kertas / gunting' });
      }

      const createRoom = await userModel.createRoom(player1, token);
      return res.json({
        message: `room berhasil di buat, id room: ${createRoom.dataValues.id}`,
        idRoom: createRoom.dataValues.id,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: 'ada yang salah di controller createRoom' });
    }
  };

  joinRoom = async (req, res) => {
    const { id } = req.params;
    const player2 = req.body;
    const token = req.token.id;

    try {
      if (
        player2.choicePlayer2 !== 'batu'
        && player2.choicePlayer2 !== 'kertas'
        && player2.choicePlayer2 !== 'gunting'
      ) {
        return res
          .status(400)
          .json({ message: 'Format harus berupa batu / kertas / gunting' });
      }
      // cari room berdasarkan ID
      const singleRoom = await userModel.getSingleRoom(id);
      // buat agar player tidak melawan dirinya sendiri
      if (singleRoom.idPlayer1 === token) {
        return res
          .status(400)
          .json({ message: 'Dilarang melawan diri sendiri' });
      }

      // buat agar player tidak dapat bermain atau mengganti data di room yang sudah selesai
      if (singleRoom.statusRoom === 'Finish') {
        res.statusCode = 400;
        return res.json({ message: 'Room sudah selesai' });
      }

      // input data pilihan player 2 ke database
      await userModel.joinRoom(player2, token, id);

      const p1Result = singleRoom.choicePlayer1;
      const p2Result = player2.choicePlayer2;

      // tentukan pemenang
      const result = await judgementRPS.judgementRPS(p1Result, p2Result);
      console.log(result); // ["win", "lose"]

      // masukan result pada database
      const RoomResult = await userModel.RoomResult(result, id);

      res.json({
        message: 'Berhasil melawan',
        'Player 1 Choice': p1Result,
        'Player 2 Choice': p2Result,
        'Player 1 Result': result[0],
        'Player 2 Result': result[1],
        'Room ID': id,
      });
      return RoomResult;
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: 'ada yang salah di controller joinRoom' });
    }
  };

  getSingleRoom = async (req, res) => {
    const { id } = req.params;
    try {
      const singleRoom = await userModel.getSingleRoom(id);
      return res.json(singleRoom);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: 'ada yang salah di controller getSingleRoom' });
    }
  };

  singleUserHistory = async (req, res) => {
    const { id } = req.token;
    try {
      const userHistory = await userModel.singleUserHistory(id);
      return res.json(userHistory);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'ada error di controller singleUserHistory' });
    }
  };

  getAllRoom = async (req, res) => {
    try {
      const allRooms = await userModel.getAllRoom();
      return res.json(allRooms);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: 'ada kesalahan di controller getAllRoom' });
    }
  };

  playerVsCom = async (req, res) => {
    const { id } = req.token;
    const { choicePlayer1 } = req.body;

    try {
      // create room dan rekam pilihan player 1
      const roomName = 'VS COM';
      const choicePlayer2 = judgementRPS.vsCom();
      const [resultPlayer1, resultPlayer2] = judgementRPS.judgementRPS(
        choicePlayer1,
        choicePlayer2,
      );

      // buat agar inputan hanya berupa batu kertas atau gintung
      if (
        choicePlayer1 !== 'batu'
        && choicePlayer1 !== 'kertas'
        && choicePlayer1 !== 'gunting'
      ) {
        return res
          .status(400)
          .json({ message: 'Format harus berupa batu / kertas / gunting' });
      }

      await userModel.playerVsCom(
        roomName,
        id,
        choicePlayer1,
        resultPlayer1,
        choicePlayer2,
        resultPlayer2,
      );
      return res.json({
        message: 'berhasil membuat room playerVsCom',
        'pilihan-mu': choicePlayer1,
        'pilihan-computer': choicePlayer2,
        'hasil-pilihanmu': resultPlayer1,
        'hasil-computer': resultPlayer2,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: 'pilihan harus berupa batu / kertas / gunting',
      });
    }
  };

  generatePdf = async (req, res) => {
    const { id } = req.token;
    const histories = await userModel.singleUserHistory(id);
    const gameHistories = histories.map((room) => ({
      room_id: room.room_id,
      roomName: room.roomName,
      updatedAt: moment(room.updatedAt).format('MMM DD, YYYY, h:mm A'),
      hasilPlayer: room.hasilPlayer,
    }));
    const pdfDoc = new PDFDocument({ size: 'A4', margin: 20 });
    const pdfPath = `output${id}.pdf`;
    const file = bucket.file(pdfPath);
    const stream = file.createWriteStream();
    pdfDoc.pipe(stream);

    pdfDoc.fontSize(12).text('Game Histories:', 60, 100);

    const tableTop = 150;
    const colWidths = [80, 200, 150, 100];
    const columns = ['Room Id', 'Room Name', 'Date', 'Result'];

    let xPos = 60;
    let yPos = tableTop;

    const addPageIfNeeded = () => {
      if (yPos > 750) {
        pdfDoc.addPage();
        yPos = 50;
      }
    };

    const drawHeaders = () => {
      xPos = 60;
      columns.forEach((col, index) => {
        pdfDoc.text(col, xPos, yPos);
        xPos += colWidths[index];
      });
      yPos += 30;
    };

    drawHeaders();

    gameHistories.forEach((history) => {
      addPageIfNeeded();

      xPos = 60;
      pdfDoc.text(history.room_id, xPos, yPos); xPos += colWidths[0];
      pdfDoc.text(history.roomName, xPos, yPos); xPos += colWidths[1];
      pdfDoc.text(history.updatedAt, xPos, yPos); xPos += colWidths[2];
      pdfDoc.text(history.hasilPlayer, xPos, yPos);

      yPos += 20;

      if (yPos > 750) {
        addPageIfNeeded();
        drawHeaders();
      }
    });

    pdfDoc.end();

    stream.on('finish', async () => {
      const url = await file.getSignedUrl({
        action: 'read',
        expires: '03-01-2500',
      });
      res.json({
        pdfUrl: url[0],
      });
    });
  };
}

module.exports = new UserController();
