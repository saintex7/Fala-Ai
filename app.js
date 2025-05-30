const app = document.getElementById('app');
const mainContent = document.getElementById('main-content');
const navButtons = document.querySelectorAll('.nav-btn');

let currentUser = null; // objeto do usuário logado
let users = JSON.parse(localStorage.getItem('falaai_users') || '{}');
let posts = JSON.parse(localStorage.getItem('falaai_posts') || '[]');
let messages = JSON.parse(localStorage.getItem('falaai_messages') || '{}');

const adminUser = { username: 'saintex', password: 'ffg..1.', admin: true };

// Se admin não existir, adiciona:
if (!users[adminUser.username]) {
  users[adminUser.username] = adminUser;
  localStorage.setItem('falaai_users', JSON.stringify(users));
}

// Função para salvar tudo no localStorage
function saveAll() {
  localStorage.setItem('falaai_users', JSON.stringify(users));
  localStorage.setItem('falaai_posts', JSON.stringify(posts));
  localStorage.setItem('falaai_messages', JSON.stringify(messages));
}

// Função para limpar conteúdo e renderizar template
function renderTemplate(id) {
  const tmpl = document.getElementById(id);
  if (!tmpl) return;
  mainContent.innerHTML = '';
  mainContent.appendChild(tmpl.content.cloneNode(true));
}

// Função para atualizar barra de navegação ativa
function setActiveNav(page) {
  navButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === page);
  });
}

// Função para mostrar tela de login
function showLogin() {
  renderTemplate('tmpl-login');
  setActiveNav(null);

  const formLogin = document.getElementById('form-login');
  const btnToRegister = document.getElementById('btn-to-register');

  btnToRegister.onclick = () => showRegister();

  formLogin.onsubmit = e => {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (!users[username]) {
      alert('Usuário não encontrado.');
      return;
    }
    if (users[username].password !== password) {
      alert('Senha incorreta.');
      return;
    }
    currentUser = {...users[username]};
    localStorage.setItem('falaai_currentUser', username);
    showFeed();
    updateNavVisibility(true);
  };
}

// Tela de cadastro
function showRegister() {
  renderTemplate('tmpl-register');
  setActiveNav(null);

  const formRegister = document.getElementById('form-register');
  const btnToLogin = document.getElementById('btn-to-login');

  btnToLogin.onclick = () => showLogin();
