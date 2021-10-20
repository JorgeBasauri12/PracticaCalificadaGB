/*
    ruta: '/api/pedidos'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getPedido, 
    crearPedido,
    actualizarPedido,
    eliminarPedido
} = require('../controllers/pedido.controller')


const router = Router();

router.get( '/', getPedido );

router.post( '/',
    [
        check('carga','La carga del pedido es necesario').not().isEmpty(),
        check('fecha','La fecha del pedido es necesario').not().isEmpty(),
        check('producto','El id de producto debe de ser válido').isMongoId(),
        check('cliente','El id del cliente debe de ser válido').isMongoId(),
        check('usuario','El id del usuario debe de ser válido').isMongoId(),
        validarCampos
    ], 
    crearPedido 
);

router.put( '/:id',
    [
        validarJWT,
        check('carga','La carga del pedido es necesario').not().isEmpty(),
        check('fecha','La fecha del pedido es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarPedido
);

router.delete( '/:id',
    eliminarPedido
);



module.exports = router;