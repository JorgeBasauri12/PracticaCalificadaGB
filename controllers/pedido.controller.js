const { response } = require('express');

const Pedido = require('../models/PedidoModel');

const getPedido = async(req, res = response) => {

    const pedido = await Pedido.find()
                                .populate('cliente','Clientenombre')
                                .populate('usuario','nombre')
                                .populate('producto', 'Productonombre')


    res.json({
        ok: true,
        pedido: pedido
    })
}

const crearPedido = async (req, res = response) => {

    const uid = req.uid;
    const pedido = new Pedido({
        usuario: uid,
        ...req.body
    });


    try {

        const pedidoDB = await pedido.save();        
        res.json({
            ok: true,
            pedido: pedidoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear pedido, consulte con el administrador'
        })
    }


}

const actualizarPedido = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const pedido = await Pedido.findById( id );

        if ( !pedido ) {
            return res.status(404).json({
                ok: true,
                msg: 'Pedido no encontrado por id',
            });
        }

        const cambiosPedido = {
            ...req.body,
            pedido: uid
        }

        const PedidoActualizado = await Pedido.findByIdAndUpdate( id, cambiosPedido, { new: true } );


        res.json({
            ok: true,
            pedido: PedidoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar pedido, consulte con el administrador'
        })
    }

}

const eliminarPedido = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const pedido = await Pedido.findById( id );

        if ( !pedido ) {
            return res.status(404).json({
                ok: true,
                msg: 'Pedido no encontrado por id',
            });
        }

        await Pedido.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Pedido borrado'
        }); 

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Pedido no puede eliminarse, consulte con el administrador'
        })
    }

}



module.exports = {
    getPedido,
    crearPedido,
    actualizarPedido,
    eliminarPedido
}