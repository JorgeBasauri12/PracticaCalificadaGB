/*
  Path: /api/logincat
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { logincat } = require('../controllers/vercat.controller');

const router = Router();
router.post('/',
  [
    check('categorianombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
  ],
  logincat
);

module.exports = router;