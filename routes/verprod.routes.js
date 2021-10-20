/*
  Path: /api/loginprod
*/
const { Router } = require('express');
const { loginprod } = require('../controllers/verprod.controller')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
router.post('/',
  [
    check('productonombre', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('proveedor', 'El id es obligatorio').isMongoId(),
    validarCampos
  ],
  loginprod
);

module.exports = router;