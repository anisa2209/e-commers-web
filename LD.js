document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi semua komponen dalam satu event listener
    initPageToggle();
    initAddToCart();
    initSearch();
    initCountdown();
    initProfile();
});

function initPageToggle() {
    const toggle = document.getElementById('pageToggle');
    const elektronikPage = document.getElementById('elektronikPage');
    const nonElektronikPage = document.getElementById('nonElektronikPage');
    
    toggle.addEventListener('change', function() {
        elektronikPage.classList.toggle('active', !this.checked);
        nonElektronikPage.classList.toggle('active', this.checked);
    });
}



function initSearch() {
    const searchBar = document.querySelector('.search-bar');
    
    searchBar.addEventListener('keyup', function(e) {
        if(e.key === 'Enter') {
            performSearch(this.value);
        }
    });
    
    function performSearch(query) {
        console.log('Searching for:', query);
        // Implementasi pencarian sebenarnya
    }
}

function initCountdown() {
    function updateCountdown() {
        const now = new Date();
        const endTime = new Date();
        endTime.setHours(23, 59, 59); // Set to end of day
        
        const diff = endTime - now;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerHTML = 
            `Promo berakhir dalam: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
}

// Fungsi untuk profil pengguna (tetap sama dengan sebelumnya)
document.addEventListener('DOMContentLoaded', function() {
        const profileBtn = document.getElementById('profile-btn');
        const profileBtnIcon = document.getElementById('profile-btn-icon');
        const profilePopup = document.getElementById('profile-popup');
        const changePhotoBtn = document.getElementById('change-photo-btn');
        const profileUpload = document.getElementById('profile-upload');
        const profileImage = document.getElementById('profile-image');
        const connectEmailBtn = document.getElementById('connect-email-btn');
        const userEmail = document.getElementById('user-email');
        const username = document.getElementById('username');
        const editNameBtn = document.getElementById('edit-name-btn');
        const nameDisplay = document.getElementById('name-display');
        const nameEditContainer = document.getElementById('name-edit-container');
        const nameInput = document.getElementById('name-input');
        const saveNameBtn = document.getElementById('save-name-btn');
        const cancelEditBtn = document.getElementById('cancel-edit-btn');
        
        // Fungsi untuk update foto profil di semua tempat
        function updateProfileImage(imageSrc) {
            profileImage.src = imageSrc;
            profileBtnIcon.src = imageSrc;
            localStorage.setItem('profileImage', imageSrc);
        }
        
        // Fungsi untuk update nama pengguna
        function updateUsername(newName) {
            username.textContent = newName;
            localStorage.setItem('username', newName);
        }
        
        // Toggle popup profil
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            profilePopup.classList.toggle('show');
        });
        
        // Tutup popup ketika klik di luar
        document.addEventListener('click', function() {
            profilePopup.classList.remove('show');
        });
        
        // Mencegah penutupan saat klik di dalam popup
        profilePopup.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Ganti foto profil
        changePhotoBtn.addEventListener('click', function() {
            profileUpload.click();
        });
        
        profileUpload.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                // Validasi ukuran file (max 2MB)
                if (file.size > 2 * 1024 * 1024) {
                    alert('Ukuran file maksimal 2MB');
                    return;
                }
                
                const reader = new FileReader();
                
                reader.onload = function(event) {
                    updateProfileImage(event.target.result);
                };
                
                reader.readAsDataURL(file);
            }
        });
        
        // Edit nama pengguna
        editNameBtn.addEventListener('click', function() {
            nameDisplay.style.display = 'none';
            nameEditContainer.style.display = 'block';
            nameInput.value = username.textContent;
            nameInput.focus();
        });
        
        // Simpan nama baru
        saveNameBtn.addEventListener('click', function() {
            const newName = nameInput.value.trim();
            if (newName) {
                updateUsername(newName);
                nameDisplay.style.display = 'block';
                nameEditContainer.style.display = 'none';
            }
        });
        
        // Batal edit nama
        cancelEditBtn.addEventListener('click', function() {
            nameDisplay.style.display = 'block';
            nameEditContainer.style.display = 'none';
        });
        
        // Enter untuk simpan nama
        nameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                saveNameBtn.click();
            }
        });
        
        // Hubungkan email
        connectEmailBtn.addEventListener('click', function() {
            const email = prompt("Masukkan alamat email Anda:");
            if (email) {
                // Validasi email dengan regex
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(email)) {
                    userEmail.textContent = email;
                    userEmail.classList.remove('email-not-connected');
                    userEmail.classList.add('email-connected');
                    connectEmailBtn.style.display = 'none';
                    // Simpan ke localStorage atau kirim ke server
                    localStorage.setItem('userEmail', email);
                } else {
                    alert("Email tidak valid! Format email harus contoh@domain.com");
                }
            }
        });
        
        // Cek data yang tersimpan di localStorage saat halaman dimuat
        if (localStorage.getItem('profileImage')) {
            updateProfileImage(localStorage.getItem('profileImage'));
        }
        
        if (localStorage.getItem('username')) {
            updateUsername(localStorage.getItem('username'));
        }
        
        if (localStorage.getItem('userEmail')) {
            userEmail.textContent = localStorage.getItem('userEmail');
            userEmail.classList.remove('email-not-connected');
            userEmail.classList.add('email-connected');
            connectEmailBtn.style.display = 'none';
        }
    });


document.addEventListener('DOMContentLoaded', function() {
    const cartBtn = document.getElementById('cart-btn');
    const cartPopup = document.getElementById('cart-popup');
    
    cartBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        cartPopup.classList.toggle('show');
    });
    
    // Tutup saat klik di luar
    document.addEventListener('click', function() {
        cartPopup.classList.remove('show');
    });
    
    // Mencegah penutupan saat klik di dalam popup
    cartPopup.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

document.addEventListener('DOMContentLoaded', function() {
  // Elemen UI
  const tombolKeranjang = document.querySelector('.tombol-keranjang');
  const tombolTutup = document.getElementById('tombolTutup');
  const popupKeranjang = document.getElementById('popupKeranjang');
  const overlay = document.querySelector('.overlay');
  
  // Fungsi buka popup
  function bukaPopupKeranjang() {
    popupKeranjang.classList.add('muncul');
    overlay.classList.add('muncul');
    document.body.style.overflow = 'hidden';
  }
  
  // Fungsi tutup popup (digunakan oleh ikon silang)
  function tutupPopupKeranjang() {
    popupKeranjang.classList.remove('muncul');
    overlay.classList.remove('muncul');
    document.body.style.overflow = 'auto';
  }
  
  // Event listeners
  tombolKeranjang.addEventListener('click', bukaPopupKeranjang);
  tombolTutup.addEventListener('click', tutupPopupKeranjang);
  
  // Tutup ketika klik di overlay
  overlay.addEventListener('click', tutupPopupKeranjang);
  
  // Tutup dengan tombol ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popupKeranjang.classList.contains('muncul')) {
      tutupPopupKeranjang();
    }
  });
  
  // Cegah event bubbling
  popupKeranjang.addEventListener('click', function(e) {
    e.stopPropagation();
  });
});

document.addEventListener('DOMContentLoaded', function() {
    // Data produk (contoh)
    const products = [
        {
            id: 1,
            name: "Alat Bantu Dengar Digital",
            price: 8500000,
            image: "alat bantu dengar biasa.jpg"
        },
        {
            id: 2,
            name: "Kursi Roda Elektrik",
            price: 6000000,
            image: "kursi roda elektrik.jpg"
        },
        {
            id: 3,
            name: "Kruk Aluminium",
            price: 350000,
            image: "kruk.jpg"
        }
        // Tambahkan produk lainnya sesuai kebutuhan
    ];

    // Variabel keranjang
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Elemen UI
    const cartBtn = document.getElementById('cart-btn');
    const cartPopup = document.getElementById('cart-popup');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const overlay = document.querySelector('.overlay');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');

    // Fungsi untuk menampilkan keranjang
    function showCart() {
        cartPopup.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateCartDisplay();
    }

    // Fungsi untuk menyembunyikan keranjang
    function hideCart() {
        cartPopup.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Fungsi untuk memperbarui tampilan keranjang
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let itemCount = 0;

        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            total += product.price * item.quantity;
            itemCount += item.quantity;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4>${product.name}</h4>
                    <p>Rp${product.price.toLocaleString()}</p>
                    <div class="quantity-control">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-btn" data-id="${item.id}">Hapus</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartTotal.textContent = `Rp${total.toLocaleString()}`;
        cartCount.textContent = itemCount;
        
        // Tambahkan event listeners untuk tombol di keranjang
        addCartItemEventListeners();
    }

    // Fungsi untuk menambahkan event listeners ke item keranjang
    function addCartItemEventListeners() {
        // Tombol tambah jumlah
        document.querySelectorAll('.increase').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const item = cart.find(item => item.id === id);
                item.quantity++;
                saveCart();
                updateCartDisplay();
            });
        });

        // Tombol kurang jumlah
        document.querySelectorAll('.decrease').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const item = cart.find(item => item.id === id);
                
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    cart = cart.filter(item => item.id !== id);
                }
                
                saveCart();
                updateCartDisplay();
            });
        });

        // Tombol hapus
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                cart = cart.filter(item => item.id !== id);
                saveCart();
                updateCartDisplay();
            });
        });
    }

    // Fungsi untuk menyimpan keranjang ke localStorage
   function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

   // Fungsi untuk checkout
    function checkout() {
    if (cart.length === 0) {
        alert('Keranjang belanja kosong!');
        return;
    }
    
    const userEmail = document.getElementById('user-email').textContent;
    
    if (userEmail === 'Email belum terhubung') {
        alert('Silakan hubungkan email terlebih dahulu untuk checkout!');
        document.getElementById('profile-popup').classList.add('show');
        document.getElementById('cart-popup').classList.remove('show');
        return;
    }
    
    alert(`Pesanan telah diterima! Total belanja: ${document.getElementById('cart-total').textContent}\nDetail pesanan akan dikirim ke ${userEmail}`);
    cart = [];
    updateCart();
    saveCartToStorage();
}

    // Fungsi untuk menambahkan produk ke keranjang
    function addToCart(productId) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: productId,
                quantity: 1
            });
        }
        
        saveCart();
        updateCartDisplay();
        
        // Animasi feedback
        const addedBtn = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
        if (addedBtn) {
            addedBtn.textContent = 'Ditambahkan!';
            addedBtn.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                addedBtn.textContent = '+ Keranjang';
                addedBtn.style.backgroundColor = '';
            }, 1000);
        }
    }

   function initCartSystem() {
    // ... [kode sebelumnya tetap sama] ...

    // FUNGSI CHECKOUT UTAMA
    function checkout() {
        // 1. Validasi keranjang tidak kosong
        if (cart.length === 0) {
            alert('Keranjang belanja kosong!');
            return;
        }
        
        // 2. Validasi email sudah terhubung
        const userEmail = document.getElementById('user-email').textContent;
        if (userEmail === 'Email belum terhubung') {
            alert('Silakan hubungkan email terlebih dahulu untuk checkout!');
            
            // Buka popup profil dan tutup keranjang
            document.getElementById('profile-popup').classList.add('show');
            hideCart();
            return;
        }
        
        // 3. Tampilkan konfirmasi checkout
        const confirmation = confirm(
            `Konfirmasi Pesanan:\n\nTotal: ${cartTotal.textContent}\nEmail: ${userEmail}\n\nLanjutkan checkout?`
        );
        
        if (confirmation) {
            // 4. Proses checkout (simulasi)
            alert(`✅ Checkout berhasil!\n\nDetail pesanan akan dikirim ke ${userEmail}\nTotal: ${cartTotal.textContent}`);
            
            // 5. Reset keranjang
            cart = [];
            saveCart();
            updateCartDisplay();
            hideCart();
            
            // 6. Redirect atau lakukan aksi lain
            // window.location.href = 'thankyou.html';
        }
    }

    // Event listener untuk tombol checkout
    checkoutBtn.addEventListener('click', checkout);

    // ... [kode lainnya tetap sama] ...
}

    // Event listeners
    cartBtn.addEventListener('click', showCart);
    closeCartBtn.addEventListener('click', hideCart);
    overlay.addEventListener('click', hideCart);
    checkoutBtn.addEventListener('click', checkout);

    // Tutup dengan tombol ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && cartPopup.classList.contains('active')) {
            hideCart();
        }
    });



    // Inisialisasi tombol tambah ke keranjang
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        const productId = parseInt(btn.getAttribute('data-id'));
        btn.addEventListener('click', function() {
            addToCart(productId);
        });
    });

    // Update tampilan keranjang saat pertama kali load
    updateCartDisplay();
});

// Variabel keranjang
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fungsi untuk menampilkan produk
function displayProducts() {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <span class="product-price">Rp${product.price.toLocaleString()}</span>
                <button class="add-to-cart" data-id="${product.id}">Tambah ke Keranjang</button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    // Tambahkan event listener untuk tombol tambah ke keranjang
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    // Cek apakah produk sudah ada di keranjang
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    saveCartToStorage();
    
    // Animasi tombol
    e.target.textContent = 'Ditambahkan!';
    e.target.style.backgroundColor = '#4CAF50';
    setTimeout(() => {
        e.target.textContent = 'Tambah ke Keranjang';
        e.target.style.backgroundColor = '#4285f4';
    }, 1000);
}

// Fungsi untuk memperbarui tampilan keranjang
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    // Kosongkan keranjang
    cartItems.innerHTML = '';
    
    // Hitung total item dan total harga
    let totalItems = 0;
    let totalPrice = 0;
    
    // Tambahkan item ke keranjang
    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <span class="cart-item-price">Rp${item.price.toLocaleString()}</span>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item" data-id="${item.id}">Hapus</button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    // Update total item dan harga
    cartCount.textContent = totalItems;
    cartTotal.textContent = `Rp${totalPrice.toLocaleString()}`;
    
    // Tambahkan event listener untuk tombol kuantitas dan hapus
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', updateQuantity);
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', removeItem);
    });
}

function addToCart(productId) {
    // 1. Cari produk di database
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // 2. Update keranjang
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            quantity: 1,
            name: product.name,
            price: product.price,
            image: product.image
        });
    }

    // 3. Simpan dan update UI
    saveCart();
    updateCartDisplay();
    showFeedback(productId);
}

function showFeedback(productId) {
    const btn = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
    if (!btn) return;

    const originalText = btn.textContent;
    btn.textContent = '✓ Ditambahkan';
    btn.classList.add('added-feedback');

    setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('added-feedback');
    }, 1000);
}