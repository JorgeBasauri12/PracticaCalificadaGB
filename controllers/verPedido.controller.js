const { response } = require("express");
//const bcrypt = require('bcryptjs');
const Pedido = require ('../models/PedidoModel');
const { generarJWT } =  require('../helpers/jwt')
const loginpedido = async(req, res= response)=> {
    const {producto, cliente} = req.body;
    try {        
        // Verificar al proveedor por su email
        const pedidoDB = await Pedido.findOne({ producto });
        if ( !pedidoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Pedido no encontrado'
                //considerar la utilizacion de este mensaje
            });
        }
       
        //const validPassword = bcrypt.compareSync( password, proveedorDB.password );
        const pedidoPDB = await Pedido.findOne({ cliente });
        if ( !pedidoPDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'Id pedido no válido'
            });
        }
        // Generar el TOKEN - JWT
        const token = await generarJWT( pedidoDB.id );
        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
module.exports = {
    loginpedido,
}