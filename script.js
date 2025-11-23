const cardContainer = document.querySelector(".card-container");
const caixaBusca = document.querySelector("#caixa-busca");
let dados = [];

// Função para carregar os dados do JSON e renderizar os cards iniciais
async function iniciarBusca() {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados);
    
} 


// Função para renderizar os cards na tela
function renderizarCards(cardsParaRenderizar) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes
    cardsParaRenderizar.forEach(dado => {
        const article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p><strong>Ano de criação:</strong> ${dado.ano}</p>
            <p class="descricao">${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Saiba mais</a>
        `;
        cardContainer.appendChild(article);
    });
}
// Adiciona um ouvinte de evento para o campo de busca
caixaBusca.addEventListener("input", function() {
    const termoBusca = caixaBusca.value.toLowerCase();
    const cardsFiltrados = dados.filter(dado => {
        const  nomeLower = dado.nome.toLowerCase();
        return nomeLower.includes(termoBusca);
    });
    renderizarCards(cardsFiltrados);
});
// Inicia a busca ao carregar a página
window.onload = iniciarBusca;
