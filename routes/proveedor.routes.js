/*
    Path: /api/usuarios
*/
const {Router}= require('express');
const {check}= require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')
const {getProveedor, crearProveedor, actualizarProveedor, eliminarProveedor} = require('../controllers/proveedor.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();
router.get('/',validarJWT,getProveedor);
router.post('/', [
    check('Companynombre', 'El nombre de la compañia es obligatorio').not().isEmpty(),
    check('Contactnombre', 'El nombre de la compañia es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),    
validarCampos,
],crearProveedor);
router.put('/:id',
    [
        validarJWT,
        check('Companynombre', 'El nombre de la compañia es obligatorio').not().isEmpty(),
        check('Contactnombre', 'El nombre de la compañia es obligatorio').not().isEmpty(),
        check('password','El password es obligatorio').not().isEmpty(), 
        check('pais', 'El pais de la compañia es obligatorio').not().isEmpty(),          
        validarCampos,   
    ] ,
    actualizarProveedor);
router.delete('/:id',validarJWT, eliminarProveedor);
module.exports=router;