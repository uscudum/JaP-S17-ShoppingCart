// Array para almacenar los productos seleccionados
const productosSeleccionados = [];

// Función para cargar los productos desde la API
function cargarProductos() {
    const productosDiv = document.getElementById('products');

    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(data => {
            // Iterar sobre cada producto y agregarlo al div de productos
            data.products.forEach(producto => {
                const productoDiv = document.createElement('div');
                productoDiv.classList.add('col-lg-3');
                productoDiv.classList.add('col-md-6');
                productoDiv.classList.add('col-sm-12');
                productoDiv.innerHTML = `
                            <div class="card text-center mb-1" style="height: 25rem;">
                            <img class='card-img-top img-thumbnail img-fluid' style='height:50%; width:100%;' src="${producto.images[0]}">
                            <div class="card-body">
                            <h5 class="card-title">${cortarString(producto.title)}</h5>
                            <p class="card-text">${producto.category}</p>
                            <p class="card-text">Precio: $${producto.price} - Stock: ${producto.stock} </p>
                            </div>
                            </div>
                        `;
                productosDiv.appendChild(productoDiv);
                // Agregar evento de escucha para cada producto
                productoDiv.addEventListener('click', () => {
                        // Agregar el producto seleccionado al array
                        productosSeleccionados.push(producto);
                        actualizarProductosSeleccionados();
                });
            });
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

function cortarString(dato){
    let result = dato
    if(dato.length > 10){
        result = dato.split(" ").slice(0, 2).join(' ')
    }
    return result
}

// Función para actualizar la lista de productos seleccionados
function actualizarProductosSeleccionados() {
    const productosSeleccionadosList = document.getElementById('productosSeleccionados');
    productosSeleccionadosList.innerHTML = '';
    let suma = 0;
    // Mostrar los productos seleccionados en la lista
    productosSeleccionados.forEach(producto => {
        const listItem = document.createElement('li');
        listItem.innerText = producto.title;
        productosSeleccionadosList.appendChild(listItem);
        suma += producto.price
    });
    document.getElementById('total').innerHTML = `<h1>Total: $${parseFloat(suma).toFixed(2)}</h1>`;
}

// Cargar productos al cargar la página
document.addEventListener('DOMContentLoaded', cargarProductos);
