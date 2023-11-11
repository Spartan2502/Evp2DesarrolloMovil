// userHandler.js


async function addUser(clientes) {
    const db = getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['clientes'], 'readwrite');
        const objectStore = transaction.objectStore('clientes');
        const request = objectStore.add(clientes);

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}

async function getAllUsers() {
    const db = getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['clientes']);
        const objectStore = transaction.objectStore('clientes');
        const request = objectStore.getAll();

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}

async function getUser(id) {
    const db = getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['clientes']);
        const objectStore = transaction.objectStore('clientes');
        const request = objectStore.get(Number(id));

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}

async function updateUser(id, clientes) {
    const db = getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['clientes'], 'readwrite');
        const objectStore = transaction.objectStore('clientes');
        clientes.id = Number(id);
        const request = objectStore.put(clientes);

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}

async function deleteUser(id) {
    const db = getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['clientes'], 'readwrite');
        const objectStore = transaction.objectStore('clientes');
        const request = objectStore.delete(id);

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}

window.userHandler = {
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
};
