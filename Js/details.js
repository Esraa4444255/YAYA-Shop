document.addEventListener("DOMContentLoaded", () => {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const img = document.getElementById("product-img");
  const name = document.getElementById("product-name");
  const desc = document.getElementById("product-desc");
  const price = document.getElementById("product-price");
  const totalPrice = document.getElementById("total-price");
  const plus = document.getElementById("plus");
  const minus = document.getElementById("minus");
  const qtyDisplay = document.getElementById("quantity-display");
  const strapContainer = document.getElementById("strap-options");
  const addBtn = document.getElementById("add-to-cart");
  const cartCount = document.getElementById("cart-count");

  let quantity = 1;
  let selectedStraps = [];
  const basePrice = product.price;

  const straps = [
    { name: "Thin Beads", price: 30 },
    { name: "Wide Beads", price: 45 },
    { name: "Metal Strap", price: 60 }
  ];

  img.src = product.img;
  name.textContent = product.name;
  desc.textContent = product.desc;
  price.textContent = basePrice;
  totalPrice.textContent = basePrice;

  straps.forEach(s => {
    const btn = document.createElement("button");
    btn.className = "strap-btn";
    btn.textContent = `${s.name} (+${s.price} EGP)`;
    btn.onclick = () => {
      if (selectedStraps.includes(s)) {
        selectedStraps = selectedStraps.filter(x => x !== s);
        btn.classList.remove("selected");
      } else {
        selectedStraps.push(s);
        btn.classList.add("selected");
      }
      updatePrice();
    };
    strapContainer.appendChild(btn);
  });

  plus.onclick = () => {
    quantity++;
    qtyDisplay.textContent = quantity;
    updatePrice();
  };

  minus.onclick = () => {
    quantity = Math.max(0, quantity - 1);
    qtyDisplay.textContent = quantity;
    updatePrice();
  };

  function updatePrice() {
    const strapTotal = selectedStraps.reduce((sum, s) => sum + s.price, 0);
    const total = (basePrice + strapTotal) * quantity;
    totalPrice.textContent = total;
  }

  addBtn.onclick = () => {
    if (quantity === 0) return showToast("Please select at least one piece.");

    const strapsNames = selectedStraps.map(s => s.name);
    const item = {
      name: product.name,
      img: product.img,
      price: basePrice + selectedStraps.reduce((sum, s) => sum + s.price, 0),
      quantity,
      straps: strapsNames
    };

    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showToast(`"${product.name}" added to cart 👜 `);
  };

  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
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

  updateCartCount();
});
