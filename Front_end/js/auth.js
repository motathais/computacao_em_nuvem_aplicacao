let token = null;
let currentUser = null;
let userId = null

async function login() {
  const usuario = document.getElementById('loginUser').value;
  const senha = document.getElementById('loginPass').value;

  const res = await fetch('https://cuddly-system-q7p7qq55w5c999p-3000.app.github.dev/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, senha })
  });

  if (res.ok) {
    const data = await res.json();
    token = data.token;
    currentUser = {
      nome: usuario,
      id: data.usuario.id 
    };
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    alert('Usuário logado com sucesso!');
  } else {
    alert('Login falhou!');
  }
}

async function register() {

  const nome = document.getElementById('registerName').value;  
  const usuario = document.getElementById('registerUser').value;
  const nascimento = document.getElementById('registerDate').value;
  const email = document.getElementById('registerEmail').value;
  const senha = document.getElementById('registerPass').value;

  const res = await fetch('https://cuddly-system-q7p7qq55w5c999p-3000.app.github.dev/api/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, usuario, nascimento, email, senha })
  });

  if (res.ok) {
    alert('Usuário cadastrado com sucesso!');
    showLogin();
  } else {
    alert('Erro ao cadastrar usuário.');
    const errorData = await res.json(); // <--- Isso aqui pega a mensagem do backend
  console.error('Erro:', errorData);  // <--- Mostra no console
  alert('Erro ao cadastrar usuário: ' + (errorData?.mensagem || 'Erro desconhecido'));
  }
}
