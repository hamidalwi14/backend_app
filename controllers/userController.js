// controllers/userController.js
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.registrasiUser = (data) =>
  new Promise(async (resolve, reject) => {
    const salt = bcrypt.genSaltSync(10);
    const encript = bcrypt.hashSync(data.password, salt);
    Object.assign(data, {
      password: encript,
    });

    userModel
      .findOne({
        username: data.username,
      })
      .then((sudahAdaUser) => {
        if (sudahAdaUser) {
          reject({
            status: false,
            msg: "Username Sudah Terdaftar",
          });
        } else {
          userModel
            .create(data)
            .then(() => {
              resolve({
                status: true,
                msg: "Berhasil Membuat User Baru",
              });
            })
            .catch((err) => {
              reject({
                status: false,
                msg: "Terjadi Kesalahan Pada Server",
              });
            });
        }
      });
  });
// LOGIN USER

exports.loginUser = (data) =>
  new Promise(async (resolve, reject) => {
    const { email, password } = data;

    console.log(email, password);

    userModel.findOne({ email: email }).then((user) => {
      if (user) {
        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) {
          return resolve({
            status: false,
            msg: "password Salah!",
          });
        }

        resolve({
          status: true,
          msg: "Login Berhasil",
          data: user,
        });
      } else {
        reject({
          status: false,
          msg: "Email Anda Tidak Terdaftar",
        });
      }
    });
  });

exports.getAllUser = () =>
  new Promise((resolve, reject) => {
    userModel
      .find({})
      .then((user) => {
        if (user.length > 0) {
          resolve({
            status: true,
            msg: "Berhasil memuat data",
            data: user,
          });
        } else {
          reject({
            status: false,
            msg: "Tidak ada data",
          });
        }
      })
      .catch((err) => {
        reject({
          status: false,
          msg: "Terjadi kesalahan pada server",
        });
      });
  });
