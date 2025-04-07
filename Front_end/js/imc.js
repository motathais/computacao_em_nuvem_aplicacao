async function salvarImc() {
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
  
    if (!peso || !altura) {
      alert("Preencha peso e altura corretamente!");
      return;
    }
  
    const res = await fetch('https://cuddly-system-q7p7qq55w5c999p-3000.app.github.dev/api/imc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ peso, altura, userId: currentUser.id })
    });
  
    if (res.ok) {
      alert('IMC salvo com sucesso!');
      loadImcList();
    } else {
      alert('Erro ao salvar IMC');
    }
  }
  
  async function loadImcList() {
    document.getElementById('imcForm').style.display = 'none';
    document.getElementById('imcList').style.display = 'block';
  
    const res = await fetch('https://cuddly-system-q7p7qq55w5c999p-3000.app.github.dev/api/imc', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  
    if (!res.ok) {
      alert('Erro ao buscar dados');
      return;
    }
  
    const dados = await res.json();
    const tabela = document.getElementById('tabelaImc');
    tabela.innerHTML = '';
    dados.forEach((item) => {

    const classificacao = classificarImc(item.imc);    

          tabela.innerHTML += `
        <tr>
          <td>${new Date(item.createdAt).toLocaleDateString()}</td>
          <td>${item.peso}</td>
          <td>${item.altura}</td>
          <td>${item.imc.toFixed(2)}</td>
          <td>${classificacao}</td>
          <td>
            <button onclick="editarImc(${item.id})">Editar</button>
            <button onclick="excluirImc(${item.id})">Excluir</button>
          </td>
        </tr>
      `;
    });
  }

  function classificarImc(imc) {
    if (imc < 18.5) return 'Abaixo do peso';
    if (imc < 25) return 'Peso normal';
    if (imc < 30) return 'Sobrepeso';
    if (imc < 35) return 'Obesidade grau I';
    if (imc < 40) return 'Obesidade grau II';
    return 'Obesidade grau III';
  }
  
  function editarImc(id) {
    alert('Editar registro ' + id);
    // Implementar PUT futuramente
  }
  
  function excluirImc(id) {
    alert('Excluir registro ' + id);
    // Implementar DELETE futuramente
  }
  

