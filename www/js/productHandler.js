
async function addProduct(product) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['productos'], 'readwrite');
        const objectStore = transaction.objectStore('productos');
        const request = objectStore.add(product);

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}

async function getAllProducts() {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['productos']);
        const objectStore = transaction.objectStore('productos');
        const request = objectStore.getAll();

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}

async function getProduct(id) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['productos']);
        const objectStore = transaction.objectStore('productos');
        const request = objectStore.get(Number(id));

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}


async function updateProduct(id, product) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['productos'], 'readwrite');
        const objectStore = transaction.objectStore('productos');
        product.id = Number(id);  // Asegurarse de que la propiedad id está presente en el objeto
        const request = objectStore.put(product);

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}

async function deleteProduct(id) {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['productos'], 'readwrite');
        const objectStore = transaction.objectStore('productos');
        const request = objectStore.delete(id);

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}

window.productHandler = {
    addProduct,
    getAllProducts,
    updateProduct,
    deleteProduct, 
    getProduct
};

