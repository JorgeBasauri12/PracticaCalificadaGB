const { response } = require("express");
const Cliente = require ('../models/ClientesModel');
const { generarJWT } =  require('../helpers/jwt')
const loginCliente = async(req, res= response)=> {
    const { clientenombre, usuario } = req.body;
    try {        
        // Verificar al proveedor por su email
        const clienteDB = await Cliente.findOne({ clientenombre });
        if ( !clienteDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Cliente no encontrado'
                //considerar la utilizacion de este mensaje
            });
        }
        // Verificar contraseña
        const clientePDB = await Cliente.findOne({ usuario });
        if ( !clientePDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'Id usuario no válido'
            });
        }
        // Generar el TOKEN - JWT
        const token = await generarJWT( clienteDB.id );
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
    loginCliente,
}