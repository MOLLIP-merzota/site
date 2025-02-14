// Инициализация AOS
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
      duration: 1000,
      once: false,
      disable: false
  });

  // Переинициализация AOS при прокрутке
  window.addEventListener('scroll', () => {
      document.querySelectorAll('.aos-animate').forEach(element => {
          element.classList.remove('aos-animate');
      });
      AOS.refresh();
  });

  // Инициализация выпадающих меню
  initializeDropdowns();

  // Инициализация переключателя форм
  initializeAuthToggle();
});

// Функции для корзины
let cartCount = 0;

function addToCart(productName) {
  cartCount++;
  document.getElementById('cart-count').textContent = cartCount;
  alert(`Товар "${productName}" добавлен в корзину!`);
}

// Функции для аутентификации
function toggleAuthModal() {
  $('#authModal').modal('toggle');
}

function initializeAuthToggle() {
  const toggleSlider = document.querySelector('.toggle-slider');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const modalHeader = document.getElementById('authModalLabel');
  const labels = document.querySelectorAll('.toggle-label');

  if (toggleSlider) {
      toggleSlider.addEventListener('click', function() {
          // Переключаем активное состояние слайдера
          this.classList.toggle('active');

          // Переключаем формы
          loginForm?.classList.toggle('active');
          signupForm?.classList.toggle('active');

          // Обновляем заголовок модального окна
          if (modalHeader) {
              modalHeader.textContent = this.classList.contains('active') ? 'Регистрация' : 'Вход';
          }

          // Обновляем активные метки
          labels.forEach(label => {
              label.classList.toggle('active');
          });
      });
  }
}

function toggleAuthMode(event) {
  const slider = event.target.closest('.toggle-slider');
  if (!slider) return;

  const forms = document.querySelectorAll('.auth-form');
  const header = document.getElementById('authModalHeader');
  const labels = document.querySelectorAll('.toggle-label');
  
  slider.classList.toggle('active');
  forms.forEach(form => form.classList.toggle('active'));
  header.classList.toggle('login-mode');
  header.classList.toggle('signup-mode');
  labels.forEach(label => label.classList.toggle('active'));
}

// Инициализация форм авторизации
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = btoa(document.getElementById('loginPassword').value.trim());

  const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser'));
  if (rememberedUser && rememberedUser.email === email && rememberedUser.password === password) {
      alert('Вы успешно вошли!');
      $('#authModal').modal('hide');
      updateProfileMenu(rememberedUser.username);
  } else {
      alert('Неверные данные!');
  }
});

document.getElementById('signupForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('signupEmail').value.trim();
  const password = btoa(document.getElementById('signupPassword').value.trim());
  const username = document.getElementById('signupName').value.trim();

  localStorage.setItem('rememberedUser', JSON.stringify({ email, password, username }));
  alert('Регистрация успешна!');
  $('#authModal').modal('hide');
  updateProfileMenu(username);
});

// Функция обновления меню профиля
function updateProfileMenu(username) {
  const profileName = document.getElementById('profile-name');
  if (profileName) {
      profileName.textContent = username || 'Профиль';
  }
}

// Функция поиска
function searchProducts() {
  const searchTerm = document.querySelector('input[type="text"]').value.toLowerCase();
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
      const productName = card.querySelector('h3').textContent.toLowerCase();
      card.style.display = productName.includes(searchTerm) ? 'block' : 'none';
  });
}

// Функция прокрутки вверх
function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
}

// Инициализация выпадающих меню
function initializeDropdowns() {
  document.querySelectorAll('.relative').forEach(menu => {
      const link = menu.querySelector('a');
      const dropdown = menu.querySelector('div');
      
      if (!link || !dropdown) return;

      // Add click handler
      link.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (dropdown.style.display === 'block') {
              dropdown.style.display = 'none';
          } else {
              showDropdown(dropdown);
          }
      });

      // Improved mouse events
      link.addEventListener('mouseenter', () => {
          showDropdown(dropdown);
      });

      menu.addEventListener('mouseleave', () => {
          // Delay hiding to allow mouse movement
          setTimeout(() => {
              if (dropdown.style.display === 'block') {
                  dropdown.style.display = 'none';
              }
          }, 300);
      });

      // Handle clicks outside the dropdown
      document.addEventListener('click', (e) => {
          if (!menu.contains(e.target)) {
              dropdown.style.display = 'none';
          }
      });
  });
}

function showDropdown(dropdown) {
  dropdown.style.display = 'block';
  dropdown.style.animation = 'fadeIn 0.6s ease-out';
}

// Добавление стилей анимации
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
  }

  .toggle-slider.active .toggle-thumb {
      transform: translateX(100%);
  }

  .auth-form {
      display: none;
      opacity: 0;
      transition: opacity 0.3s ease;
  }

  .auth-form.active {
      display: block;
      opacity: 1;
  }

  .toggle-label {
      color: #666;
      transition: color 0.3s ease;
  }

  .toggle-label.active {
      color: #4299e1;
  }
`;
document.head.appendChild(style);