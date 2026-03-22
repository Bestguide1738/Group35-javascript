// Shared products array (at least 6 products)
const products = [
    { id: 1, name: "Phone", price: 1355, category: "Electronics", image: "iphone.avif" },
    { id: 2, name: "Macbook Pro", price: 2099, category: "Electronics", image: "lappy.jpg" },
    { id: 3, name: "Sneakers", price: 89, category: "Fashion", image: "jordans.webp" },
    { id: 4, name: "Sun Glasses", price: 29, category: "Fashion", image: "glasses.webp" },
    { id: 5, name: "Atomic Habits", price: 13, category: "Books", image: "book.jpeg" },
    { id: 6, name: "Wireless Headphones", price: 149, category: "Electronics", image: "studiopro.jpg" },
    { id: 7, name: "Quality Hoodie", price: 69, category: "Fashion", image: "hoodie.webp" },
    { id: 8, name: "Playstation 5", price: 300, category: "Electronics", image: "ps5.webp" },
    { id: 9, name: "Smart Speaker", price: 200, category: "Electronics", image: "speaker.webp" },
    { id: 10, name: "Heels", price: 183, category: "Fashion", image: "heels.jpg" },
    { id: 11, name: "Quran", price: 10, category: "Books", image: "quaran.jpg" },
    { id: 12, name: "Ladies' Bag", price: 1000, category: "Fashion", image: "Ladies_bag.avif" },


  ];
  
  // Cart array (it will be loaded/saved to localStorage)
  let cart = [];
  
  // Load cart from localStorage with error handling
  function loadCart() {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        cart = JSON.parse(savedCart);
        if (!Array.isArray(cart)) throw new Error("Invalid cart data");
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      cart = []; // reset on error
      alert("There was a problem loading your cart. It has been reset.");
    }
  }
  
  // Save cart to localStorage
  function saveCart() {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }
  
  // Updating cart counter if one adds items so it changes
  function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      countElement.textContent = totalItems;
    }
  }
  
  // Adding products to the cart to cart 
  function addToCart(productId) {
    try {
      const product = products.find(p => p.id === productId);
      if (!product) throw new Error("Product not found");
  
      const existing = cart.find(item => item.id === productId);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
  
      saveCart();
      updateCartCount();
      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error(error);
      alert("Error adding item: " + error.message);
    }
  }
  
   
   // Displaying the  products dynamically 
function displayProducts(filteredProducts = products) {
    const container = document.getElementById('products-container');
    if (!container) return;
  
    container.innerHTML = ''; // clear previous
  
    filteredProducts.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
  
      //  rating randomly for the products
      const rating = (Math.random() * 1.5 + 3.5).toFixed(1); // between 3.5–5.0 rating.
      const reviews = Math.floor(Math.random() * 200 + 20);
  
      card.innerHTML = `
        <div class="image-wrapper">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
          <div class="category">${product.category}</div>
          <h3>${product.name}</h3>
          <div class="price">$${product.price.toLocaleString()}</div>
          <div class="rating">
            ★★★★★ <span>(${rating} · ${reviews} reviews)</span>
          </div>
          <button class="add-btn" onclick="addToCart(${product.id})">
            Add to Cart
          </button>
        </div>
      `;
  
      container.appendChild(card);
    });
  }
  
  // Search functionality (index.html)
  function searchProducts() {
    const query = document.getElementById('search-input')?.value.toLowerCase().trim();
    if (!query) {
      displayProducts();
      return;
    }
  
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    displayProducts(filtered);
  }
  
  // Filter by category (index.html)
  function filterByCategory(category) {
    if (category === 'all') {
      displayProducts();
    } else {
      const filtered = products.filter(p => p.category === category);
      displayProducts(filtered);
    }
  }
  
  // Displaying the  cart items 
  function displayCart() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    if (!container || !totalEl) return;
  
    container.innerHTML = '';
  
    if (cart.length === 0) {
      container.innerHTML = '<p>Your cart is empty.</p>';
      totalEl.textContent = 'Total: $0';
      return;
    }
  
    let total = 0;
  
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
  
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <span>${item.name}</span>
        <span>$${item.price}</span>
        <div>
          <button onclick="changeQuantity(${item.id}, -1)">-</button>
          ${item.quantity}
          <button onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>
        <span>$${itemTotal.toFixed(2)}</span>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
      `;
  
      container.appendChild(row);
    });
  
    totalEl.textContent = `Total: $${total.toFixed(2)}`;
  }
  
  // Function to Change quantity of the products 
  function changeQuantity(id, change) {
    try {
      const item = cart.find(i => i.id === id);
      if (!item) return;
  
      item.quantity += change;
      if (item.quantity < 1) item.quantity = 1; // minimum 1
  
      saveCart();
      displayCart();
      updateCartCount();
    } catch (error) {
      console.error(error);
    }
  }
  
  // Remove from cart 
  function removeFromCart(id) {
    try {
      if (!confirm("Remove this item?")) return;
  
      cart = cart.filter(item => item.id !== id);
      saveCart();
      displayCart();
      updateCartCount();
    } catch (error) {
      console.error(error);
    }
  }
  
  // Checkout-form validation 
  function validateCheckout(event) {
    event.preventDefault();
  
    try {
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const address = document.getElementById('address').value.trim();
      const paymentMethod = getSelectedPayment();
  
      if (!name || !email || !phone || !address) {
        throw new Error("All fields are required.");
      }
  
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Invalid email format.");
      }
  
      if (!/^\+?\d{9,15}$/.test(phone.replace(/\s/g, ''))) {
        throw new Error("Invalid phone number.");
      }
  
      if (cart.length === 0) {
        throw new Error("Your cart is empty. Cannot proceed to checkout.");
      }
      if(!paymentMethod){
        document.getElementById('payment-error').style.display = 'block';
        throw new Error("Please select a payment method.");
      }else{
        document.getElementById('payment-error').style.display = 'none';
      }
      //Successfull payment message that shows after you have made payments
  
      alert("Order placed successfully!");
      // Clear cart after "success"
      cart = [];
      saveCart();
      updateCartCount();
      window.location.href = 'index.html';
  
    } catch (error) {
      alert("Validation error: " + error.message);
    }
  }
  
  // Initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    updateCartCount();
   // Cookie Consent Logic
const cookieBanner = document.getElementById('cookie-banner');
const cookieAcceptBtn = document.getElementById('cookie-accept');

if (cookieBanner && cookieAcceptBtn) {
  // Check if user has already accepted
  const hasConsented = localStorage.getItem('cookieConsent') === 'accepted';

  if (!hasConsented) {
    // Show banner after a small delay 
    setTimeout(() => {
      cookieBanner.classList.add('visible');
    }, 1500);
  }

  cookieAcceptBtn.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    cookieBanner.classList.remove('visible');
    
  });
}
    // On the Home page
    if (document.getElementById('products-container')) {
      displayProducts();
  
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        searchInput.addEventListener('input', searchProducts);
      }
  
      // Category buttons.. Those of All, Electronics etc.
      document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          filterByCategory(btn.dataset.category);
        });
      });
        
    }
  
    // Cart page
    if (document.getElementById('cart-items')) {
      displayCart();
    }
  
    // Checkout page
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', validateCheckout);
    }
  });
   // Get selected payment method
function getSelectedPayment() {
    const selected = document.querySelector('input[name="payment"]:checked');
    return selected ? selected.value : null;
  }
