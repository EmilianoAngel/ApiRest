import {pool} from './database.js'

const getProductos = async () => {
    const data = await pool.query('SELECT * FROM productos');
    return data.rows
}

const getProductosById = async (id) => {
    const data = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
    return data.rows
}

const postProducts = async (producto) => {
    const query = 'INSERT INTO productos (nombre, precio) VALUES ($1, $2)';
    const values = [producto.nombre, producto.precio];
    await pool.query(query, values);
    return producto;
}

const putProducts = async (producto, id) => {
    const query = 'UPDATE productos SET nombre = $1, precio = $2 WHERE id = $3';
    const values = [producto.nombre, producto.precio, id];
    await pool.query(query, values);
    return {id:id, nombre:producto.nombre, precio:producto.precio};
}

const deleteProducts = async (id) => {
    const data = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);

    const query = 'DELETE FROM productos WHERE id = $1';
    const values = [id];
    await pool.query(query, values);
    return data.rows;
}

export default {getProductos, getProductosById, postProducts, putProducts, deleteProducts};