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

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  showToast(`"${name}" added to cart 👜`);
}
function viewDetails(name, price, desc, img) {
  const product = { name, price, desc, img };
  localStorage.setItem('selectedProduct', JSON.stringify(product));
  window.location.href = 'details.html';
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
