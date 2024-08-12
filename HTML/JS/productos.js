const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener('DOMContentLoaded', e => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
    const selectAnimal = document.getElementById('selectAnimal');
    selectAnimal.addEventListener('change', () => {
        const animal = selectAnimal.value;
        fetchData(animal);
    });
    const initialAnimal = selectAnimal.value;
    fetchData(initialAnimal);
});

cards.addEventListener('click', e => { addCarrito(e) });
items.addEventListener('click', e => { btnAumentarDisminuir(e) })

const fetchData = async (animal) => {
    const res = await fetch(`/api-${animal}.json`);
    const data = await res.json();
    pintarCards(data);
};

const pintarCards = data => {
    cards.innerHTML = '';

    data.forEach(item => {
        templateCard.querySelector('h5').textContent = item.title;
        templateCard.querySelector('p').textContent = item.precio;
        templateCard.querySelector('img').setAttribute('src', item.thumbnailUrl);
        templateCard.querySelector('button').dataset.id = item.id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });

    cards.appendChild(fragment);
};

const addCarrito = e => {
    if (e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const showNotification = (message) => {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
  
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
};
const setCarrito = item => {
    const producto = {
        title: item.querySelector('h5').textContent,
        precio: item.querySelector('p').textContent,
        id: item.querySelector('button').dataset.id,
        cantidad: 1,
        animal: document.getElementById('selectAnimal').value
    }
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = { ...producto }

    pintarCarrito();

    const mensaje = `Usted agregó "${producto.title}" a su pedido`;
    showNotification(mensaje);
}

const pintarCarrito = () => {
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        if (producto.animal === document.getElementById('selectAnimal').value){ 
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('span').textContent = producto.precio * producto.cantidad

        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)}
    })
    items.appendChild(fragment)

    pintarFooter()

    const actualizarBotonFinalizarCompra = () => {
        const botonFinalizarCompra = document.querySelector('#finalizar-compra');
        botonFinalizarCompra.addEventListener('click', () => {
            carrito = {};
            pintarCarrito();
            actualizarBotonFinalizarCompra();
        });
        if (Object.keys(carrito).length === 0) {
          botonFinalizarCompra.style.display = 'none';
        } else {
          botonFinalizarCompra.style.display = 'block';
        }
      };

      actualizarBotonFinalizarCompra();

    localStorage.setItem('carrito', JSON.stringify(carrito))
    
}

const pintarFooter = () => {
    footer.innerHTML = ''

    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `<th scope="row" colspan="5"> <b>Carrito vacío - </b>Seleccione sus productos</th>`
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
        actualizarBotonFinalizarCompra();
    })
}

const btnAumentarDisminuir = e => {
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = { ...producto }
        }
        pintarCarrito()
    }
    e.stopPropagation()
}