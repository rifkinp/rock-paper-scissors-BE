const { body } = require('express-validator');

const userRegisterValidation = [
  body('username')
    .notEmpty()
    .withMessage('Mohon isi username anda yang telah terdaftar')
    .isString()
    .withMessage('username harus berupa character/huruf'),

  body('email')
    .notEmpty()
    .withMessage('Mohon isi email anda yang telah terdaftar')
    .isEmail()
    .withMessage('Format email salah'),

  body('password')
    .notEmpty()
    .withMessage('Mohon isi password anda yang telah terdaftar')
    .isLength({
      min: 6,
      max: 15,
    })
    .withMessage(
      'Format penulisan password kurang tepat (min 6 & max 15 character)',
    ),
];

const userLoginValidation = [
  body('username')
    .notEmpty()
    .withMessage('Username wajib diisi')
    .isString()
    .withMessage('Format username harus berupa huruf'),

  body('password')
    .notEmpty()
    .withMessage('Password wajib diisi')
    .isLength({ min: 6, max: 15 })
    .withMessage('Format password salah, min 6 dan max 15 huruf'),
];

const updateBioValidation = [
  body('fullname')
    .notEmpty()
    .withMessage('Tolong masukan nama lengkap-mu')
    .isString(),
  body('address')
    .notEmpty()
    .withMessage('Tolong masukan alamat tinggal-mu')
    .isString()
    .withMessage('Format input salah, harus menggunakan character / huruf'),
  body('phoneNumber')
    .notEmpty()
    .withMessage('Tolong masukan nomor hp-mu')
    .isMobilePhone('id-ID')
    .withMessage('Format nomor telpon salah'),
];

const inputHistory = [
  body('pilihan').notEmpty().withMessage('Tolong masukan pilihan kamu'),
  body('judgement')
    .notEmpty()
    .withMessage('Tolong masukan pilihan kamu')
    .isString()
    .withMessage('Format input salah, harus menggunakan huruf'),
];

const createRoom = [
  body('roomName').notEmpty().withMessage('Tolong masukan nama room'),
  body('choicePlayer1')
    .notEmpty()
    .withMessage('Tolong masukan pilihan kamu')
    .isString()
    .withMessage('Format salah, harus menggunakan huruf'),
];

const joinRoom = [
  body('choicePlayer2')
    .notEmpty()
    .withMessage('Tolong masukan pilihan kamu')
    .isString()
    .withMessage('Format salah, harus menggunakan huruf'),
];

const vsCom = [
  body('choicePlayer1')
    .notEmpty()
    .withMessage('Tolong masukan pilihanmu batu/kertas/gunting')
    .isString()
    .withMessage('Format salah, harus berupa Huruf/Character'),
];

module.exports = {
  userLoginValidation,
  userRegisterValidation,
  updateBioValidation,
  inputHistory,
  createRoom,
  joinRoom,
  vsCom,
};
