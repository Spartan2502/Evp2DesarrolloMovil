let db;

async function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('FinalProject', 1);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            const objectStoreProductos = db.createObjectStore('productos', { keyPath: 'id', autoIncrement: true });
            objectStoreProductos.createIndex('nombre', 'nombre', { unique: false });

            const objectStoreClientes = db.createObjectStore('clientes', { keyPath: 'id', autoIncrement: true });
            objectStoreClientes.createIndex('nombre', 'nombre', { unique: false });
            objectStoreClientes.createIndex('apellido', 'apellido', { unique: false });
            objectStoreClientes.createIndex('credito', 'credito', { unique: false });

            const objectStoreCompras = db.createObjectStore('compras', { keyPath: 'id_compra' });
            objectStoreCompras.createIndex('id_producto', 'id_producto', { unique: false });
            objectStoreCompras.createIndex('id_usuario', 'id_usuario', { unique: false });
            objectStoreCompras.createIndex('fecha', 'fecha', { unique: false });1
        };

        request.onsuccess = function (event) {
            db = event.target.result;
            resolve(db);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}

function getDB() {
    return db;
}

window.dbHandler = { openDB, getDB };
