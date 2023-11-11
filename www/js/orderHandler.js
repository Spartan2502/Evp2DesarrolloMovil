
async function newOrder(compra) {
    const db = getDB();
    const transaction = db.transaction('compras', 'readwrite');
    const objectStore = transaction.objectStore('compras');

    const id_compra = `${compra.id_producto}-${compra.id_usuario}`;
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    if (month < 10) {
        date = `${day}-0${month}-${year}`
    } else {
        date =`${day}-${month}-${year}`
    }
    const newCompra = { ...compra, id_compra, fecha_compra: date };

    console.log(newCompra);

    const request = objectStore.add(newCompra);

    return new Promise((resolve, reject) => {
        request.onsuccess = function () {
            resolve();
        };

        request.onerror = function (event) {
            reject(event.target.error);
        };
    });
}





window.orderHandler = {
    newOrder
};
