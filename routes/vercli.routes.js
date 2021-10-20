/*
  Path: /api/loginCliente
*/
const { Router } = require('express');
const { loginCliente } = require('../controllers/vercliente.controller')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
router.post('/',
  [
    check('clientenombre','El nombre del cliente es necesario').not().isEmpty(),
    check('usuario','El id de usuario debe de ser válido').isMongoId(),
    validarCampos
  ],
  loginCliente
);

module.exports = router;