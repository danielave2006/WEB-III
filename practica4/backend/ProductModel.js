const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // tu contraseña
    database: 'tienda'
});

connection.connect();

const Product = {
    getAll: (callback) => {
        connection.query('SELECT * FROM productos', callback);
    },
    create: (data, callback) => {
        connection.query('INSERT INTO productos SET ?', data, callback);
    },
    update: (id, data, callback) => {
        connection.query('UPDATE productos SET ? WHERE id = ?', [data, id], callback);
    },
    delete: (id, callback) => {
        connection.query('DELETE FROM productos WHERE id = ?', [id], callback);
    }
};

module.exports = Product;
