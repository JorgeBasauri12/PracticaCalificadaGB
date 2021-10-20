const { response } = require('express');

const Clientes = require('../models/ClientesModel');

const getClientes = async(req, res = response) => {

    const cliente = await Clientes.find()
                                .populate('usuario','clientenombre telefono img')
                                


    res.json({
        ok: true,
        cliente: cliente
    })
}

const crearCliente = async (req, res = response) => {

    const uid = req.uid;
    const cliente = new Clientes({
       usuario: uid,
        ...req.body
    });


    try {

        const clienteDB = await cliente.save();        
        res.json({
            ok: true,
            cliente: clienteDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear nuevo cliente, consulte con el administrador'
        })
    }


}

const actualizarCliente = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const cliente = await Clientes.findById( id );

        if ( !cliente ) {
            return res.status(404).json({
                ok: true,
                msg: 'Cliente no encontrado por id',
            });
        }

        const cambiosCliente = {
            ...req.body,
            usuario: uid
        }

        const ClienteActualizado = await Clientes.findByIdAndUpdate( id, cambiosCliente, { new: true } );


        res.json({
            ok: true,
            cliente: ClienteActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar cliente, consulte con el administrador'
        })
    }

}

const eliminarCliente = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const cliente = await Clientes.findById( id );

        if ( !cliente ) {
            return res.status(404).json({
                ok: true,
                msg: 'Cliente no encontrado por id',
            });
        }

        await Clientes.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Cliente borrado'
        }); 

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Cliente no puede eliminarse, consulte con el administrador'
        })
    }

}



module.exports = {
    getClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente
}