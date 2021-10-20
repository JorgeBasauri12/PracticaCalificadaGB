const {Schema, model} = require('mongoose');
const CategoriaSchema = Schema({
    categorianombre: {
        type: String,
        required: true,
        unique: true
    },
    descripcion:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    img: {
        type: String,
    },
   
});
CategoriaSchema.method('toJSON', function(){
    const {__v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})
module.exports = model( 'Categoria', CategoriaSchema );
