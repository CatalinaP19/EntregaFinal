// Carrito con detalles
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let cartCount = cartItems.length;

const cartCountSpan = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartList = document.getElementById('cart-items');
const clearBtn = document.getElementById('clear-cart');
const closeBtn = document.querySelector('.close-btn');

cartCountSpan.textContent = cartCount;

// Mostrar modal
document.querySelector('.cart').addEventListener('click', () => {
  renderCart();
  cartModal.classList.remove('hidden');
});

// Cerrar modal
closeBtn.addEventListener('click', () => {
  cartModal.classList.add('hidden');
});

// Vaciar carrito
clearBtn.addEventListener('click', () => {
  cartItems = [];
  cartCount = 0;
  localStorage.removeItem('cartItems');
  cartCountSpan.textContent = cartCount;
  renderCart();
});

// Agregar al carrito (MENÚ botones)
document.querySelectorAll('.btn-menu1, .btn-menu2, .btn-menu3').forEach(button => {
  button.addEventListener('click', (e) => {
    const menuItem = e.target.closest('.menu-item');
    if (!menuItem) return;

    const title = menuItem.querySelector('h4')?.textContent.trim();
    const price = menuItem.querySelector('span')?.textContent.trim();

    if (title && price) {
      cartItems.push({ title, price });
      cartCount++;
      cartCountSpan.textContent = cartCount;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  });
});

// Renderizar productos en el modal
function renderCart() {
  cartList.innerHTML = '';
  if (cartItems.length === 0) {
    cartList.innerHTML = '<li>No hay productos en el carrito.</li>';
    return;
  }
  cartItems.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.title} - ${item.price}`;
    cartList.appendChild(li);
  });
}

/*Este bloque es para seleccionar los combos y mostrarlos en el carrito*/
document.querySelectorAll('.btn-primary').forEach(button => {
  button.addEventListener('click', (e) => {
    const productCard = e.target.closest('.product-card');
    const title = productCard.querySelector('.product-title').textContent.trim();
    const price = productCard.querySelector('.product-price').textContent.trim();
    cartItems.push({ title, price });
    cartCount++;
    cartCountSpan.textContent = cartCount;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  });
});
// Carrusel automático muy sencillo
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
let index = 0;

function showSlide(i) {
  slides.style.transform = `translateX(${-i * 100}%)`;
}

setInterval(() => {
  index = (index + 1) % images.length;
  showSlide(index);
}, 3000);

document.querySelectorAll('.btn-secondary').forEach(button => {
  button.addEventListener('click', (e) => {
    const productCard = e.target.closest('.product-card');
    productCard.classList.toggle('show-details');
  });
});
// Mostrar detalles del producto al hacer clic