let cards = [];
let currentPage = 1;
let cardsPerPage = 24;
let filteredCards = [];

fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
  .then(response => response.json())
  .then(data => {
    cards = data.data;
    filteredCards = cards; // Inizialmente mostra tutte le carte
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

  cardsToDisplay.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('col-lg-2', 'col-md-4', 'col-sm-6', 'mb-4');
    cardElement.innerHTML =
      `<div class="card" style="width: 100%;">
            <img src="${card.card_images[0].image_url}" class="card-img-top" alt="${card.name}" onclick="mostraDettagliCarta(${JSON.stringify(card).replace(/"/g, '&quot;')})" data-bs-toggle="modal" data-bs-target="#cardModal">
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
  const range = 2; // Numero di pagine da visualizzare

  for (let i = Math.max(1, currentPage - range); i <= Math.min(totalPages, currentPage + range); i++) {
    displayedPages.push(i);
  }

  // Assicurati di includere la prima e l'ultima pagina se non già presenti
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
  currentPage = 1; // Reset a pagina 1 quando cambia il numero di carte per pagina
  renderCards();
  updatePagination();
}

function filterCards() {
  const selectedType = document.getElementById('cardType').value;

  if (selectedType) {
    filteredCards = cards.filter(card => card.type.includes(selectedType));
  } else {
    filteredCards = cards; // Mostra tutte le carte se non c'è filtro
  }

  currentPage = 1; // Reset a pagina 1 quando cambia il filtro
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
  filteredCards = cards; // Ripristina tutte le carte
  currentPage = 1; // Reset a pagina 1
  renderCards();
  updatePagination();
  document.getElementById('suggestions').style.display = 'none';
}

function mostraDettagliCarta(card) {
  // Mostra il modal con i dettagli della carta
  document.getElementById('modalCardName').innerText = card.name;
  document.getElementById('modalCardDescription').innerText = card.desc;
  document.getElementById('modalCardType').innerText = card.type;
  document.getElementById('modalCardAttack').innerText = card.atk || 'N/A';
  document.getElementById('modalCardDefense').innerText = card.def || 'N/A';

  // Mostra l'immagine nel modal
  document.getElementById('modalImage').src = card.card_images[0].image_url;

  // Mostra il modal
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
      suggestionItem.className = 'suggestion-item';
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