
let cart = JSON.parse(localStorage.getItem("cart")) || [];


updateCartCount();

function addToCart(name, price, img) {
  
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;  
  } else {
    
    cart.push({
      name: name,
      price: price,
      img: img,
      quantity: 1
    });
  }

function viewDetails(product) {
  localStorage.setItem('selectedProduct', JSON.stringify(product));
  window.location.href = 'details.html';
}

function addToCart(name, price, img) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.name === name);
  if (existing) existing.quantity++;
  else cart.push({name, price, img, quantity:1});
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart!`);
}


function addToCart(name, price, img) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.name === name);
  if (existing) existing.quantity++;
  else cart.push({ name, price, img, quantity: 1 });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

  
  localStorage.setItem("cart", JSON.stringify(cart));

  
  updateCartCount();

  
  showToast(`"${name}" added to cart 👜`);
}

function updateCartCount() {
  const cartBadge = document.getElementById("cart-count");
  if (cartBadge) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
  }
}
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
