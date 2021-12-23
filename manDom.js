function abrirModal() {
    let modal = document.querySelector('.modal01');
    let backgroundC = document.querySelector('body');
    let button = document.querySelector('.btn-modal');
    let buttonEdit = Array.from(document.querySelectorAll('.btn-Editar'));
    buttonEdit.forEach(()=>{for(let i=0;i<buttonEdit.length;i++){
        buttonEdit[i].style.pointerEvents = 'none'
    }});
    let buttonExcluir = Array.from(document.querySelectorAll('.btn-Excluir'));
    buttonExcluir.forEach(()=>{for(let i=0;i<buttonExcluir.length;i++){
        buttonExcluir[i].style.pointerEvents = 'none'
    }});
    document.getElementById('idFilme').innerText = 'Cadastrar filme'
    button.style.pointerEvents = 'none'
    backgroundC.style.background = '#999'
    modal.style.display = 'block';
}
function fecharModal() {
    let fechar = document.querySelector('.modal01');
    let button = document.querySelector('.btn-modal');
    let backgroundC = document.querySelector('body');
    let buttonEdit = Array.from(document.querySelectorAll('.btn-Editar'));
    buttonEdit.forEach(()=>{for(let i=0;i<buttonEdit.length;i++){
        buttonEdit[i].style.pointerEvents = 'visible'
    }});
    let buttonExcluir = Array.from(document.querySelectorAll('.btn-Excluir'));
    buttonExcluir.forEach(()=>{for(let i=0;i<buttonExcluir.length;i++){
        buttonExcluir[i].style.pointerEvents = 'visible'
    }});
    button.style.pointerEvents = 'visible';
    backgroundC.style.background = 'white'
    fechar.style.display = 'none';
    button.style.display = 'block';
    limparCampos();
}
// Interaçao com layout

// verifica se os dados do input foram validados
function isValidFields(){
    return document.getElementById('form01').reportValidity()
}
//limpa os campos do input
function limparCampos(){
    const campos = document.querySelectorAll('.modal-input')
    campos.forEach(campo => campo.value = '')
}
//se os dados estiverem validados, salva os valores do input num OBJ
function saveFilmes(){
    location.reload()

    if(isValidFields()){
        const filme = {
            nome: document.getElementById('nome').value,
            diretor: document.getElementById('diretor').value,
            country: document.getElementById('country').value,
            idioma: document.getElementById('idioma').value,
        }
        //fecha modal,chama a function create do backend
        // Create Filme/Update
        const indice = document.getElementById('nome').dataset.index
        if(indice == 'new'){
            createFilme(filme);
            fecharModal();
            saveTable();    
        }else {
            updateFilme(indice, filme)
            saveTable()
            fecharModal()
        }
    }
}
// evento pra chamar a F saveFilmes

document.querySelector('.btn-salvar').addEventListener('click', saveFilmes);
// limpa o tbody da tabela

function clearTable(){
    const rows = document.querySelectorAll('#tabFilme>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row));
}
 // pega os dados do getLocalStorage e coloca eles num foreach pra pegar o conteudo

 function saveTable() {
    const dbFilmes = readFilme();
    clearTable();
    dbFilmes.forEach(createRow);
 //    
 }
 saveTable()

// pega os atributos do objeto recebido do localstorage e coloca eles no html
function createRow(filme,indice){
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td>${filme.nome}</td>
    <td>${filme.diretor}</td>
    <td>${filme.country}</td>
    <td>${filme.idioma}</td>
    <td>
             <button class="btn-Editar" id="Edit-${indice}">Editar</button>
             <button class="btn-Excluir" id="Delete-${indice}">Excluir</button>
    </td>
    `
    document.querySelector('#tabFilme>tbody').appendChild(newRow);
}

// prencher os campos do edit
function preencherCampos(filme){
    document.getElementById('nome').value = filme.nome
    document.getElementById('diretor').value = filme.diretor
    document.getElementById('country').value = filme.country
    document.getElementById('idioma').value = filme.idioma
    document.getElementById('nome').dataset.index = filme.indice

}

//funct pegar o valor do indice do objeto e mudar o valor dos inputs
function editFilme(indice){
    const filme = readFilme()[indice]
    filme.indice = indice
    preencherCampos(filme)
    abrirModal()
}

// funct pra diferenciar os botoes editar/excluir
function editExclui(event){
    if(event.target.type === 'submit'){
        const [action, indice] = event.target.id.split('-')
        if(action == 'Edit'){
            editFilme(indice);
            document.getElementById('idFilme').innerText = 'Atualizar filme';
        }else{
            deleteFilme(indice);
            saveTable();
        }
    }
}
    // evento botoes edit/excluir
    document.querySelector('#tabFilme>tbody').addEventListener('click', editExclui)
