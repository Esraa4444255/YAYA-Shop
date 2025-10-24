(function(){
  if(window.emailjs) {
    emailjs.init("oC4uck4mYQLYIWS8R");
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const emptyCart = document.getElementById("empty-cart");
  const orderSummary = document.getElementById("order-summary");
  const subtotalEl = document.getElementById("subtotal");
  const deliveryFeeEl = document.getElementById("delivery-fee");
  const totalEl = document.getElementById("total");
  const cartCount = document.getElementById("cart-count");
  const confirmOrderBtn = document.getElementById("confirm-order");
  const governorateSelect = document.getElementById("governorate");
  const paymentSelect = document.getElementById("payment-method");
  const visaDetails = document.getElementById("visa-details");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
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

  function renderCart() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      emptyCart.style.display = "block";
      orderSummary.style.display = "none";
      cartCount.textContent = 0;
      return;
    }

    emptyCart.style.display = "none";
    orderSummary.style.display = "block";

    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="details">
          <h4>${item.name}</h4>
          <p>${item.price} EGP</p>
          <div class="quantity">
            <button class="remove btn btn-sm ms-2" data-index="${index}">Remove</button>
          </div>
      `;
      cartItemsContainer.appendChild(div);
    });

    updateSummary();
  }

  function updateSummary() {
    let subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    subtotalEl.textContent = subtotal.toFixed(2);

    const selectedOption = governorateSelect.options[governorateSelect.selectedIndex];
    const deliveryFee = selectedOption?.dataset.fee ? Number(selectedOption.dataset.fee) : 0;
    deliveryFeeEl.textContent = deliveryFee;

    totalEl.textContent = (subtotal + deliveryFee).toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("increase")) {
      const i = e.target.dataset.index;
      cart[i].quantity++;
    } else if (e.target.classList.contains("decrease")) {
      const i = e.target.dataset.index;
      if (cart[i].quantity > 1) cart[i].quantity--;
    } else if (e.target.classList.contains("remove")) {
      const i = e.target.dataset.index;
      cart.splice(i, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  });

  governorateSelect.addEventListener("change", updateSummary);

  paymentSelect.addEventListener("change", () => {
    visaDetails.style.display = paymentSelect.value === "visa" ? "block" : "none";
  });

  confirmOrderBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Your cart is empty!");
      return;
    }

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const city = document.getElementById("city").value.trim();
    const street = document.getElementById("street").value.trim();
    const governorate = governorateSelect.value;

    if (!name || !phone || !city || !street || !governorate || !paymentSelect.value) {
  showToast("Please complete all required fields.");
  return;
}

    emailjs.send("service_odcd4v7", "template_hpn22nq", {
      name,
      phone,
      city,
      street,
      governorate: governorateSelect.value,
      payment: paymentSelect.value,
      message: cart.map(i => `${i.name} (x${i.quantity})`).join(", "),
      total: totalEl.textContent
    }).then(() => {
      const orderData = {
        name,
        phone,
        city,
        street,
        governorate: governorateSelect.value,
        payment: paymentSelect.value,
        total: totalEl.textContent,
        items: cart
      };

      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));

      const orderId = "YAYA" + Math.floor(Math.random() * 1000000);

      document.querySelector(".cart-container").innerHTML = `
        <div class="invoice">
          <h2>🎀 Order Confirmed!</h2>
          <p>Thank you <strong>${orderData.name}</strong> for shopping with <strong>YAYA</strong> 💕</p>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <div class="invoice-details">
            <h4>Shipping Info</h4>
            <p>${orderData.street}, ${orderData.city}, ${orderData.governorate}</p>
            <p><strong>Phone:</strong> ${orderData.phone}</p>
            <p><strong>Payment:</strong> ${orderData.payment}</p>
          </div>
          <div class="invoice-items">
            <h4>Order Items</h4>
            ${orderData.items.map(item => `
              <p>${item.name} × ${item.quantity} — ${item.price * item.quantity} EGP</p>
            `).join("")}
          </div>
          <hr>
          <h3>Total: ${orderData.total} EGP</h3>
          <button class="btn" id="back-home">Return to Home</button>
        </div>
      `;

      document.getElementById("back-home").addEventListener("click", () => {
        window.location.href = "index.html";
      });
      renderCart();
    })
    .catch(err => {
      console.error(err);
      showToast("❌ Failed to send order. Try again later.");
    });
  });

  renderCart();
});
