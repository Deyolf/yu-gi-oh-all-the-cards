let cards = [];
let currentPage = 1;
let cardsPerPage = 12;
let filteredCards = [];

// Recupera i dati dall'API TCGdex
fetch('https://api.tcgdex.net/v2/en/cards')
    .then(response => response.json())
    .then(data => {
        cards = data;
        filteredCards = cards; // Mostra inizialmente tutte le carte
        renderCards();
        updatePagination();
    })
    .catch(error => console.error('Errore durante il recupero delle carte:', error));

    function renderCards() {
        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = '';
        const start = (currentPage - 1) * cardsPerPage;
        const end = start + cardsPerPage;
        const cardsToDisplay = filteredCards.slice(start, end);
        const quality = 'low'; // O 'low', a seconda delle tue necessità
        const extension = 'jpg'; // Usa 'webp' per una migliore compressione
        cardsToDisplay.forEach(card => {
            // Aggiungi estensione e parametro per la qualità (se richiesto)
            const imageUrl = `${card.image}/${quality}.${extension}`; // Cambia secondo le specifiche dell'API
            const cardElement = document.createElement('div');
            cardElement.classList.add('col-lg-2', 'col-md-4', 'col-sm-6', 'mb-4');
            cardElement.innerHTML =
                `<div class="card" style="width: 100%;">
                      <img src="${imageUrl}" class="card-img-top" alt="${card.name}" 
                           onclick="mostraDettagliCarta(${JSON.stringify(card).replace(/"/g, '&quot;')})" 
                           data-bs-toggle="modal" data-bs-target="#cardModal">
                      <div class="card-body">
                        <h5 class="card-title">${card.name}</h5>
                      </div>
                </div>`;
            cardsContainer.appendChild(cardElement);
        });
    }
    

function updatePagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
    const displayedPages = getDisplayedPages(currentPage, totalPages);

    const prevItem = document.createElement('li');
    prevItem.className = 'page-item' + (currentPage === 1 ? ' disabled' : '');
    prevItem.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage - 1})">&laquo; Precedente</a>`;
    pagination.appendChild(prevItem);

    displayedPages.forEach(page => {
        const pageItem = document.createElement('li');
        pageItem.className = 'page-item' + (currentPage === page ? ' active' : '');
        pageItem.innerHTML = `<a class="page-link" href="#" onclick="changePage(${page})">${page}</a>`;
        pagination.appendChild(pageItem);
    });

    const nextItem = document.createElement('li');
    nextItem.className = 'page-item' + (currentPage === totalPages ? ' disabled' : '');
    nextItem.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Successivo &raquo;</a>`;
    pagination.appendChild(nextItem);
}

function getDisplayedPages(currentPage, totalPages) {
    const displayedPages = [];
    const range = 2;

    for (let i = Math.max(1, currentPage - range); i <= Math.min(totalPages, currentPage + range); i++) {
        displayedPages.push(i);
    }

    if (!displayedPages.includes(1)) {
        displayedPages.unshift(1);
    }
    if (!displayedPages.includes(totalPages) && totalPages > 1) {
        displayedPages.push(totalPages);
    }

    return displayedPages;
}

function changePage(page) {
    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderCards();
    updatePagination();
}

function updateCardsPerPage() {
    cardsPerPage = parseInt(document.getElementById('cardsPerPage').value);
    currentPage = 1;
    renderCards();
    updatePagination();
}

function filterCards() {
        const selectedType = document.getElementById('cardType').value;
    
        // Se c'è un tipo selezionato, filtra le carte
        if (selectedType) {
            // Filtra le carte in base alla categoria
            for(var i=0;i<18189;i++){
                let id=cards[i].id;
                fetch(`https://api.tcgdex.net/v2/en/cards/${id}`)
    .then(response => response.json())
    .then(data => {
        if(data.category==selectedType){
            filteredCards = cards[i];
        }
    })
    .catch(error => console.error('Errore durante il recupero delle carte:', error));
            }
        } else {
            filteredCards = cards;
        }
        currentPage = 1;
        renderCards();
        updatePagination();
    }

function searchCard(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value.toLowerCase();

    if (query.trim() === '') {
        resetSearch();
        return;
    }

    filteredCards = filteredCards.filter(card => card.name.toLowerCase().includes(query));

    if (filteredCards.length > 0) {
        currentPage = 1;
        renderCards();
        updatePagination();
    } else {
        alert('Nessuna carta trovata.');
    }
    document.getElementById('suggestions').style.display = 'none';
}

function resetSearch() {
    document.getElementById('searchInput').value = '';
    filteredCards = cards;
    currentPage = 1;
    renderCards();
    updatePagination();
    document.getElementById('suggestions').style.display = 'none';
}

function mostraDettagliCarta(carta) {
    // Costruisci l'URL dell'immagine con alta qualità in formato WebP
    const imageUrl = `${carta.image}/high.jpg`;
    document.getElementById('modalCardName').innerText = carta.name ;
    fetch(`https://api.tcgdex.net/v2/en/cards/${carta.name}`)
    .then(response => response.json())
    .then(data => {
        let card = [];
        card=data;
        console.log(card);
        document.getElementById('modalCardCategory').innerText = card.category || 'N/A';
        document.getElementById('modalCardType').innerText = card.illustrator || 'N/A';
        document.getElementById('modalCardSet').innerText = card.set.name || 'N/A';
        document.getElementById('modalCardHP').innerText = card.hp ? `${card.hp} HP` : 'N/A';
        document.getElementById('modalCardTypes').innerText = card.types ? card.types.join(', ') : 'N/A';
        document.getElementById('modalCardWeaknesses').innerText = card.weaknesses ? card.weaknesses.map(w => `${w.type} ${w.value}`).join(', ') : 'N/A';
        })
    .catch(error => console.error('Errore durante il recupero delle carte:', error));
    // Imposta i dettagli della carta nel modal
    
    
    
    // Imposta l'immagine della carta nel modal
    document.getElementById('modalImage').src = imageUrl;

    // Mostra il modal con i dettagli della carta
    const cardModal = new bootstrap.Modal(document.getElementById('cardModal'));
    cardModal.show();
}

function showSuggestions() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = '';

    if (query.length > 0) {
        const filteredCardsSuggestions = cards.filter(card => card.name.toLowerCase().includes(query));

        filteredCardsSuggestions.slice(0, 8).forEach(card => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item list-group-item list-group-item-action';
            suggestionItem.textContent = card.name;
            suggestionItem.onclick = () => {
                document.getElementById('searchInput').value = card.name;
                mostraDettagliCarta(card);
                suggestionsContainer.style.display = 'none';
            };
            suggestionsContainer.appendChild(suggestionItem);
        });

        suggestionsContainer.style.display = (filteredCardsSuggestions.length > 0) ? 'block' : 'none';
    } else {
        suggestionsContainer.style.display = 'none';
    }
}