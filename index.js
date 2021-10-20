const express= require ('express');//síntaxis para importar modulos en node.js
require('dotenv').config();
const {dbConection} =require('./config/database');
const cors = require('cors');
//crear servidor
const app=express();
//estableciendo la configuración de cors
app.use(cors());
//Lectura y parseo del body
app.use(express.json());
//crear la conexión a la BD
dbConection();
//verificando variables de entorno
console.log(process.env);
//Rutas de la API
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/categoria', require('./routes/categoria.routes'));
app.use('/api/proveedor', require('./routes/proveedor.routes'));
app.use('/api/loginpro', require('./routes/verpro.routes'));
app.use('/api/logincat',require('./routes/vercat.routes'));
app.use('/api/productos', require('./routes/producto.routes'));
app.use('/api/loginprod', require('./routes/verprod.routes'));
app.use('/api/clientes', require('./routes/clientes.routes'));
app.use('/api/loginCliente', require('./routes/vercli.routes'));
app.use('/api/pedidos', require('./routes/pedido.routes'));
app.use('/api/loginpedido', require('./routes/verpedido.routes'));
//codigo para desplegar el servidor
app.listen(process.env.PORT,()=>{
    console.log('Servidor Node.js desplegado en el puerto: '+process.env.PORT);
})
// usuario - password BD
// adminproject - IJjwrU2xO7eei8kH