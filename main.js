const formContatos = document.getElementById('form-contatos');
const deleteButton = '<button><img src="./images/icone-excluir.png" alt="Icone de exclusão"></button>';
const callButton = '<button><img src="./images/icone-ligar.png" alt="Icone de ligação"></button>';
const numerosContatos = [];
const nomesContatos = [];

let linhas = '';

formContatos.addEventListener('submit', function (e) {
    e.preventDefault();

    adicionalinha();
    atualizaLista();
    atualizaContatosTotais();
});

function adicionalinha() {
    const inputNomeContato = document.getElementById('nome-contato');
    const inputNumeroContato = document.getElementById('numero-contato');

    const numeroTelefone = inputNumeroContato.value.replace(/\D/g, '').slice(0, 14);

    if (numerosContatos.includes(numeroTelefone)) {
        alert(`O Número: ${numeroTelefone} já é um contato`);
        inputNumeroContato.value = '';
        inputNomeContato.value = '';
    } else {
        nomesContatos.push(inputNomeContato.value);
        numerosContatos.push(numeroTelefone);

        let linha = '<tr>';
        linha += `<td> ${inputNomeContato.value} </td>`;
        linha += `<td> ${numeroTelefone} </td>`;
        linha += `<td><button onclick="ligarContato(event)"><img src="./images/icone-ligar.png" alt="Icone de ligação"></button></td>`;
        linha += `<td><button onclick="apagarContato(event)"><img src="./images/icone-excluir.png" alt="Icone de exclusão"></button></td>`;
        linha += '</tr>';

        linhas += linha;

        inputNumeroContato.value = '';
        inputNomeContato.value = '';
    }
}

function apagarContato(event) {
    const botao = event.currentTarget;
    const linhaAtual = botao.closest('tr');
    linhaAtual.remove();
    atualizaContatosTotais();
}

function atualizaLista() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function ligarContato(event) {
    const botao = event.currentTarget;
    const linhaAtual = botao.closest('tr');
    const contato = linhaAtual.querySelector('td:nth-child(1)').textContent;
    alert(`Você está ligando para ${contato}`);
}

function atualizaContatosTotais() {
    const totalContatos = calculaContatosTotais();
    const contatosTabela = document.getElementById('contatos-totais');
    contatosTabela.innerHTML = totalContatos;
}

function calculaContatosTotais() {
    const corpoTabela = document.querySelector('tbody');
    const totalContatos = corpoTabela.children.length;
    return totalContatos;
}

const inputNumeroContato = document.getElementById('numero-contato');
inputNumeroContato.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').slice(0, 14);
});