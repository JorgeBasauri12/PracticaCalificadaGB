const { response } = require("express");
const bcrypt = require('bcryptjs');
const categoria = require ('../models/CategoriaModel');
const { generarJWT } =  require('../helpers/jwt')
const logincat = async(req, res= response)=> {
    const { categorianombre, password } = req.body;
    try {        
        // Verificar al proveedor por su email
        const categoriaDB = await categoria.findOne({ categorianombre });
        if ( !categoriaDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Categoria no encontrada'
                //considerar la utilizacion de este mensaje
            });
        }
        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, categoriaDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }
        // Generar el TOKEN - JWT
        const token = await generarJWT( categoriaDB.id );
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
    logincat
}