document.addEventListener('deviceready', onDeviceReady, false);
const dbHandler = window.dbHandler
const userHandler = window.userHandler
const productHandler = window.productHandler
const orderHandler = window.orderHandler

function onDeviceReady() {
    openDB();
}

var cursor = {
    id: -1,
    nombre: "",
    cantidad: -1
}

async function addProduct() {
    var nombre = document.getElementById("txtName").value;
    var cantidad = parseInt(document.getElementById("txtQuantity").value);
    var precio = parseFloat(document.getElementById("txtPrice").value);

    if (nombre == "" || nombre == null) {
        alert("Agrega un nombre al producto")
    } else if (cantidad > 0) {
        var res = confirm("¿ Deseas realmente agregar el producto " + nombre + " con la cantidad de " + cantidad + "?");
        if (res == true) {
            const id = await productHandler.addProduct({ nombre, cantidad, precio });
            console.log('Producto añadido con ID:', id);
            $('#txtName').val("");
            $('#txtQuantity').val("");
            $('#txtPrice').val("");
        }
    } else {
        alert("Agrega una cantidad al producto")
    }
}

async function displayProduct() {
    const products = await productHandler.getAllProducts();
    var lstProducts = $('#lstProducts');
    lstProducts.empty();
    for (var i = 0; i < products.length; i++) {
        var item = products[i];
        var a = $("<a />");
        var h3 = $("<h3 />").text("Nombre del producto: ");
        var h4 = $("<h4 />").text("Cantidad: ");
        var h5 = $("<h4 />").text("Precio: ");
        var p = $("<p />").text("id: ");
        var span1 = $("<span />").text(item.nombre);
        span1.attr("name", "nombre");
        var span2 = $("<span />").text(item.cantidad);
        span2.attr("name", "cantidad");
        var span3 = $("<span />").text(item.precio);
        span3.attr("name", "precio");
        var span4 = $("<span />").text(item.id);
        span4.attr("name", "id");
        h3.append(span1);
        h4.append(span2);
        h5.append(span3);
        p.append(span4);
        a.append(h3);
        a.append(h4);
        a.append(h5);
        a.append(p);
        var lista = $("<li/>");
        lista.attr("data-filtertext", item.nombre);
        lista.append(a);
        lstProducts.append(lista);
    }
    lstProducts.listview("refresh");
    lstProducts.on("tap", "li", function () {
        cursor.id = $(this).find("[name='id']").text();
        cursor.nombre = $(this).find("[name='nombre']").text();
        cursor.cantidad = $(this).find("[name='cantidad']").text();
        cursor.precio = $(this).find("[name='precio']").text();
        $("#popupUpdateDelete").popup("open");
    });
}


$(document).on("pagebeforeshow", "#loadpage", function () {
    displayProduct();
});
function updateProduct() {
    var nuevoNombre = $("#txtNewName").val();

    productHandler.getProduct(cursor.id)
        .then(originalProduct => {

            const updatedProduct = {
                nombre: nuevoNombre,
                cantidad: originalProduct.cantidad,
                precio: originalProduct.precio
            };

            productHandler.updateProduct(cursor.id, updatedProduct)
                .then(() => {
                    productHandler.getAllProducts().then(displayProduct);
                    $.mobile.back(); 
                })
                .catch(error => {
                    console.log('Error al actualizar el producto:', error);
                });
        })
        .catch(error => {
            console.log('Error al recuperar el producto original:', error);
        });
}

function deleteProduct() {
    var res = confirm("Deseas eliminar el producto: " + cursor.nombre + "\ncon la cantidad de: " + cursor.cantidad);
    if (res == true) {
        var idToDelete = parseInt(cursor.id);
        productHandler.deleteProduct(idToDelete)
            .then(() => {
                productHandler.getAllProducts().then(displayProduct);
                $("#popupUpdateDelete").popup().popup("close"); // In
            })
            .catch(error => {
                console.log('Error al eliminar el producto:', error);
            });
    }
}

// users
// users
// users
// users



var cursorcli = {
    id: -1,
    nombre: "",
    apellido: "",
    credito: -1
}

async function addUser() {
    const nombre = document.getElementById("usrName").value;
    const apellido = document.getElementById("usrLstName").value;
    const credito = parseFloat(document.getElementById("usrCredit").value);

    if (nombre === "" || apellido === "" || isNaN(credito)) {
        alert("Por favor, completa todos los campos y asegúrate de que el crédito sea un número.");
        return;
    }

    const id = await userHandler.addUser({ nombre, apellido, credito });
    console.log('Usuario añadido con ID:', id);
    $('#usrName').val("");
    $('#usrLstName').val("");
    $('#usrCredit').val("");
}

async function displayUsers() {
    const users = await userHandler.getAllUsers();
    var lstUsers = $('#lstUsers');
    lstUsers.empty();
    for (var i = 0; i < users.length; i++) {
        var item = users[i];
        var a = $("<a />");
        var h3 = $("<h3 />").text("Nombre: ");
        var h4 = $("<h4 />").text("Apellido: ");
        var h5 = $("<h4 />").text("Crédito: ");
        var p = $("<p />").text("id: ");
        var span1 = $("<span />").text(item.nombre);
        span1.attr("name", "nombre");
        var span2 = $("<span />").text(item.apellido);
        span2.attr("name", "apellido");
        var span3 = $("<span />").text(item.credito);
        span3.attr("name", "credito");
        var span4 = $("<span />").text(item.id);
        span4.attr("name", "id");
        h3.append(span1);
        h4.append(span2);
        h5.append(span3);
        p.append(span4);
        a.append(h3);
        a.append(h4);
        a.append(h5);
        a.append(p);
        var lista = $("<li/>");
        lista.attr("data-filtertext", item.nombre);
        lista.append(a);
        lstUsers.append(lista);
    }
    lstUsers.listview("refresh");
    lstUsers.on("tap", "li", function () {
        cursorcli.id = $(this).find("[name='id']").text();
        cursorcli.nombre = $(this).find("[name='nombre']").text();
        cursorcli.apellido = $(this).find("[name='apellido']").text();
        cursorcli.credito = $(this).find("[name='credito']").text();
        $("#popupUserUpdateDelete").popup("open");
    });
}

$(document).on("pagebeforeshow", "#loadUsers", function () {
    displayUsers();
});

function updateUser() {
    const nuevoNombre = $("#usrNewName").val();
    const nuevoApellido = $("#usrNewLstName").val();
    const nuevoCredito = parseFloat($("#usrNewCredit").val());

    userHandler.getUser(cursorcli.id)
        .then(originalUser => {
            const updatedFields = {};
            if (nuevoNombre !== "") updatedFields.nombre = nuevoNombre;
            if (nuevoApellido !== "") updatedFields.apellido = nuevoApellido;
            if (!isNaN(nuevoCredito)) updatedFields.credito = nuevoCredito;

            const updatedUser = {
                ...originalUser,
                ...updatedFields
            };

            userHandler.updateUser(cursorcli.id, updatedUser)
                .then(() => {
                    userHandler.getAllUsers().then(displayUsers);
                    $.mobile.back();
                })
                .catch(error => {
                    console.log('Error al actualizar el usuario:', error);
                });
        })
        .catch(error => {
            console.log('Error al recuperar el usuario original:', error);
        });
}


function deleteUser() {
    const res = confirm("Deseas eliminar al usuario: " + cursorcli.nombre + " " + cursorcli.apellido + "\ncon el crédito de: " + cursorcli.credito);
    if (res === true) {
        const idToDelete = parseInt(cursorcli.id);
        userHandler.deleteUser(idToDelete)
            .then(() => {
                userHandler.getAllUsers().then(displayUsers);
                $("#popupUserUpdateDelete").popup().popup("close");
            })
            .catch(error => {
                console.log('Error al eliminar el usuario:', error);
            });
    }
}



//orders

function cargarUsuarios() {
    userHandler.getAllUsers()
        .then(usuarios => {
            const selectUsuario = document.getElementById("usuario");
            selectUsuario.innerHTML = ""; 

            usuarios.forEach(usuario => {
                const option = document.createElement("option");
                option.value = usuario.id;
                option.text = usuario.nombre + " " + usuario.apellido + "- $" + usuario.credito;
                selectUsuario.appendChild(option);
            });
        })
        .catch(error => {
            console.log("Error al cargar los usuarios:", error);
            alert("Error al cargar los usuarios.");
        });
}

function cargarProductos() {
    productHandler.getAllProducts()
        .then(productos => {
            const selectProducto = document.getElementById("producto");
            selectProducto.innerHTML = ""; 

            productos.forEach(producto => {
                const option = document.createElement("option");
                option.value = producto.id;
                option.text = producto.nombre + " - $" + producto.precio;
                selectProducto.appendChild(option);
            });
        })
        .catch(error => {
            console.log("Error al cargar los productos:", error);
            alert("Error al cargar los productos.");
        });
}

$(document).on("pagebeforeshow", "#makeorders", function () {
    cargarUsuarios();
    cargarProductos();
});


async function newOrder() {
    const id_usuario = parseInt(document.getElementById("usuario").value);
    const id_producto =  parseInt(document.getElementById("producto").value);
    const fecha_compra = Date.now();

    if (id_usuario === "" || id_producto === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    try {
        const cliente = await userHandler.getUser(id_usuario);
        const producto = await productHandler.getProduct(id_producto);

        if (cliente.credito < producto.precio) {
            alert("El cliente no tiene suficiente crédito para comprar este producto.");
            return;
        }
        if (producto.cantidad <= 0){
            alert("No hay stock de este producto");
            return;
        }

        const compra = {
            id_usuario,
            id_producto,
            fecha_compra
        };
        console.log(compra);

        await orderHandler.newOrder(compra);

        const nuevoCredito = cliente.credito - producto.precio;
        await userHandler.updateUser(id_usuario, { ...cliente, credito: nuevoCredito });
        const nevoStock = producto.cantidad - 1
        await productHandler.updateProduct(id_producto, { ...producto, cantidad: nevoStock})

        alert("Compra creada con éxito.");
    } catch (error) {
        console.log("Error al crear la compra:", error);
        alert("Error al crear la compra.");
    }
}
