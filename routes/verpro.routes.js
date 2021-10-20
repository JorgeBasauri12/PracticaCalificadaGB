/*
  Path: /api/loginpro
*/
const { Router } = require('express');
const { loginpro } = require('../controllers/verpro.controller')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
router.post('/',
  [
    check('Companynombre', 'El nombre de la compañia es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
  ],
  loginpro
);

module.exports = router;