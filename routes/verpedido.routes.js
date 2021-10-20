/*
  Path: /api/loginprod
*/
const { Router } = require('express');
const { loginpedido } = require('../controllers/verPedido.controller')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
router.post('/',
  [
    check('producto', 'El id del producto es obligatorio').isMongoId(),
    check('cliente', 'El id del cliente es obligatorio').isMongoId(),
    validarCampos
  ],
  loginpedido
);

module.exports = router;