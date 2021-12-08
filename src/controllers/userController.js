const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const db = require("../database/models");

module.exports = {
  register: (req, res) => {
    return res.render("users/register");
  },
  processRegister: (req, res) => {
    let errores = validationResult(req);

    if (errores.isEmpty()) {
      const { nombre, apellido, email, pass } = req.body;
      let img = req.files[0].filename;

      db.Users.create({
        name: nombre.trim(),
        lastName: apellido.trim(),
        email: email.trim().tolowercase(),
        password: bcryptjs.hashSync(pass.trim(), 10),
        rolId: 2,
        avatar: img ? img : "imagenDefault.jpg",
      })
        .then((usuario) => {
          req.session.userLogin = {
            id: usuario.id,
            nombre: usuario.name,
            rol: usuario.rolId,
            avatar: usuario.avatar,
          };
          return res.redirect("/");
        })
        .catch((error) => console.log(error));
    } else {
      return res.render("user/register", {
        errores: errores.mapped(),
        old: req.body,
      });
    }
    res.redirect("/user");
  },
  login: (req, res) => {
    return res.render("users/login");
  },
  processLogin: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      const { email, recordar } = req.body;
      db.Users.findOne({
        where: { email },
      }).then((user) => {
        req.session.userLogin = {
          id: user.id,
          nombre: user.name,
          rol: user.rolId,
          avatar: user.avatar,
        }
        if (recordar) {
          res.cookie("Veterinaria", req.session.userLogin, {
            maxAge: 1000 * 60 * 60 * 24 * 100000,
          });
        }

        res.redirect("/");
      })
      return res.redirect("/users/profile");
    } else {
      return res.render("users/login", {
        errores: errors.mapped(),
        old: req.body,
      });
    }
  },
  profile: (req, res) => {
    return res.render("users/profile");
  },
  editProfile: (req, res) => {
    return res.render("users/editProfile");
  },
  pass: (req, res) => {
    return res.render("users/pass");
  },
};
