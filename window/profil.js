// app.js - Основной файл инициализации
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация AOS
    initAOS();
    
    // Инициализация корзины
    initCart();
    
    // Инициализация аутентификации
    initAuth();
    
    // Инициализация выпадающих меню
    initDropdowns();
  });
  
  // cart.js - Функционал корзины
  const cart = {
    count: 0,
    addToCart(productName) {
      this.count++;
      document.getElementById('cart-count').textContent = this.count;
      alert(`Товар "${productName}" добавлен в корзину!`);
    }
  };
  
  // auth.js - Функционал аутентификации
  const auth = {
    toggleModal() {
      $('#authModal').modal('toggle');
    },
  
    initToggle() {
      const slider = document.querySelector('.toggle-slider');
      const loginForm = document.getElementById('loginForm');
      const signupForm = document.getElementById('signupForm');
      const modalHeader = document.getElementById('authModalLabel');
      const labels = document.querySelectorAll('.toggle-label');
  
      if (slider) {
        slider.addEventListener('click', () => {
          slider.classList.toggle('active');
          loginForm?.classList.toggle('active');
          signupForm?.classList.toggle('active');
          modalHeader.textContent = slider.classList.contains('active') ? 'Регистрация' : 'Вход';
          labels.forEach(label => label.classList.toggle('active'));
        });
      }
    },
  
    handleLogin(e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = btoa(document.getElementById('loginPassword').value.trim());
  
      const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser'));
      if (rememberedUser && rememberedUser.email === email && rememberedUser.password === password) {
        alert('Вы успешно вошли!');
        $('#authModal').modal('hide');
        this.updateProfileMenu(rememberedUser.username);
      } else {
        alert('Неверные данные!');
      }
    },
  
    handleSignup(e) {
      e.preventDefault();
      const email = document.getElementById('signupEmail').value.trim();
      const password = btoa(document.getElementById('signupPassword').value.trim());
      const username = document.getElementById('signupName').value.trim();
  
      localStorage.setItem('rememberedUser', JSON.stringify({ email, password, username }));
      alert('Регистрация успешна!');
      $('#authModal').modal('hide');
      this.updateProfileMenu(username);
    },
  
    updateProfileMenu(username) {
      const profileName = document.getElementById('profile-name');
      if (profileName) {
        profileName.textContent = username || 'Профиль';
      }
    }
  };
  
  // Функция для выхода из аккаунта
    function logout() {
        // Удаляем данные аутентификации из localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        
        // Перенаправляем пользователя на главную страницу
        window.location.href = 'window.html';
    }

    // Добавляем обработчик события к кнопке "Выход"
    document.querySelector('.Btn').addEventListener('click', logout);

    // search.js - Функционал поиска
    const search = {
        init() {
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) {
            searchInput.addEventListener('input', this.handleSearch);
        }
        },
    
        handleSearch() {
        const searchTerm = this.value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            card.style.display = productName.includes(searchTerm) ? 'block' : 'none';
        });
        }
    };
  
  // scroll.js - Функционал прокрутки
  const scroll = {
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  
  // dropdown.js - Функционал выпадающих меню
  const dropdown = {
    init() {
      document.querySelectorAll('.relative').forEach(menu => {
        const link = menu.querySelector('a');
        const dropdown = menu.querySelector('div');
        
        if (!link || !dropdown) return;
  
        link.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.toggle(dropdown);
        });
  
        link.addEventListener('mouseenter', () => {
          this.show(dropdown);
        });
  
        menu.addEventListener('mouseleave', () => {
          setTimeout(() => {
            if (dropdown.style.display === 'block') {
              dropdown.style.display = 'none';
            }
          }, 300);
        });
      });
    },
  
    toggle(dropdown) {
      if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
      } else {
        this.show(dropdown);
      }
    },
  
    show(dropdown) {
      dropdown.style.display = 'block';
      dropdown.style.animation = 'fadeIn 0.6s ease-out';
    }
  };
  
  // styles.js - Добавление стилей
  const styles = {
    init() {
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
    }
  };
  
  // Инициализация AOS
  function initAOS() {
    AOS.init({
      duration: 1000,
      once: false,
      disable: false
    });
  
    window.addEventListener('scroll', () => {
      document.querySelectorAll('.aos-animate').forEach(element => {
        element.classList.remove('aos-animate');
      });
      AOS.refresh();
    });
  }
  
  // Инициализация корзины
  function initCart() {
    // Функции корзины уже определены в объекте cart
  }
  
  // Инициализация аутентификации
  function initAuth() {
    auth.initToggle();
    document.getElementById('loginForm')?.addEventListener('submit', auth.handleLogin);
    document.getElementById('signupForm')?.addEventListener('submit', auth.handleSignup);
  }
  
  // Инициализация выпадающих меню
  function initDropdowns() {
    dropdown.init();
  }
  
  // Запуск поиска
  search.init();
  
  // Запуск стилей
  styles.init();