//Esto es una aplicacion de Node.js
//Crear un proyecto de Node.js: npm init -y
//Instalar express: npm i express
//Vamos a crear un servidor web con express **codigo** => Infraestructura como codigo

//Importar express
import express from 'express';
import cors from 'cors';
import conectar, {pool} from './database.js';
import services from './services.js'
//Crear una aplicacion de express. A partir de ahora **app** es el servidor.
const app = express();
//Middleware: Capa que se ejecuta antes de llamada de un servicio
app.use(express.json());
app.use(cors());
//Crear una ruta (post, get, put, delete) **peticiones** endpoint
//El endpoint tiene una ruta (nombre), dos parametros request (peticion) y response (respuesta)
//Request:  contiene la informacion de la peticion que hace el cliente
//Response: contiene la informacion que el servidor devuelve al cliente

const productos = [
    {id: 5, nombre: 'Producto 1', precio:123},//p  entonces tiene id, nombre, precio
    {id: 10, nombre: 'Producto 2', precio:456},
    {id: 3, nombre: 'Producto 3', precio:789}
]

app.get('/productos', async (req, res)=>{
    const data = await services.getProductos();
    res.status(200).json(data)
    //res.status(200).send(productos)
})

//Crear una consulta usando JS para buscar un producto por id
app.get('/productos/:id', async (req,res)=>{
    const id = req.params.id
    //find: busca en un arreglo
    //p representa cada producto de productos
    //const producto = productos.find(p => p.id == id)
    const data = await services.getProductosById(id)
    res.status(200).json(data)
})

//Crear una ruta para agregar un producto
app.post('/productos', async (req, res) => {
    const producto = req.body;
    //productos.push(producto)
    await services.postProducts(producto);
    res.status(201).json(producto);
})

//Crear una ruta para actualizar un producto
app.put('/productos/:id', async (req, res) => {
    const id = req.params.id;
    const producto = req.body;
    // const posicion = productos.findIndex(p => p.id == id);
    // productos[posicion] = {id:id, nombre: producto.nombre, precio: producto.precio }
    await services.putProducts(producto, id);
    res.status(200).json(producto);
})

//Crear una consulta usando JS para borrar un producto por id
app.delete('/productos/:id',async (req,res)=>{
    const id = req.params.id
    // const producto = productos.find(p => p.id == id)
    // if (producto === -1) {
    //     res.status(400).send('No se encontro ningun producto')
    // }
    // productos.splice(producto, 1)
    const data = await services.deleteProducts(id);
    res.status(200).json(data);
    //res.status(200).send('Producto eliminado')
})

const port=3800;
conectar();
//La aplicacion usar este puerto
app.listen(port,()=>{console.log('Servidor escuchando en el puerto', port)})