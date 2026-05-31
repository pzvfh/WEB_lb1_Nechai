"use strict";

// МЕНЕДЖЕР ОБРАНОГО ДЛЯ API (ПР №3)
class WatchlistManager {
  constructor() {
    this.watchlist = JSON.parse(localStorage.getItem('cinemaWatchlist')) || [];
    this.updateBadge();
  }
  addToWatchlist(movie) {
    if (!this.isInWatchlist(movie.id)) { this.watchlist.push(movie); this.saveToStorage(); }
  }
  removeFromWatchlist(id) {
    this.watchlist = this.watchlist.filter(item => item.id !== id); this.saveToStorage();
  }
  isInWatchlist(id) { return this.watchlist.some(item => item.id === id); }
  saveToStorage() {
    localStorage.setItem('cinemaWatchlist', JSON.stringify(this.watchlist));
    this.updateBadge();
  }
  updateBadge() {
    const badge = document.getElementById('watchlist-count');
    if (badge) badge.textContent = this.watchlist.length;
  }
}
const apiWatchlistManager = new WatchlistManager();

// ЛР №4: КАТАЛОГ ТА КОШИК
function initCatalog() {
  const catalogContainer = document.getElementById("catalog-body");
  const genreFilter = document.getElementById("genre-filter");
  const searchInput = document.getElementById("movie-search");
  const priceResult = document.getElementById("price-result");
  const cartList = document.getElementById("cart-list");

  if (!catalogContainer) return;

  renderCatalog(movieAfisha, catalogContainer);
  renderGenreOptions(genreFilter);

  if (genreFilter) {
    genreFilter.addEventListener("change", () => {
      const selectedCategory = genreFilter.value;
      const filteredMovies = selectedCategory === "all" ? movieAfisha : movieAfisha.filter((movie) => movie.category === selectedCategory);
      renderCatalog(filteredMovies, catalogContainer);
    });
  }

  if (searchInput && priceResult) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();
      if (!query) { priceResult.textContent = "Введіть назву фільму"; return; }
      priceResult.textContent = priceMap.has(query) ? `Ціна квитка: ${priceMap.get(query)} грн` : "Фільм не знайдено";
    });
  }

  catalogContainer.addEventListener("click", (event) => {
    const detailsButton = event.target.closest(".details-btn");
    const buyButton = event.target.closest(".buy-btn");
    const movieCard = event.target.closest(".movie-card");

    if (!movieCard) return;
    const movie = movieAfisha.find((item) => item.id === Number(movieCard.dataset.id));
    if (!movie) return;

    if (detailsButton) {
      movieCard.classList.toggle("movie-selected");
      alert(`${movie.title} (${movie.info.year})\nРежисер: ${movie.info.director}\nРейтинг: ${movie.rating}/10\n\n${movie.info.description}`);
    }
    if (buyButton && cartList) {
      const clone = movieCard.cloneNode(true);
      clone.classList.add("cart-animate");
      clone.classList.remove("hover:-translate-y-1", "hover:shadow-2xl");
      clone.querySelectorAll("button").forEach((btn) => btn.remove());
      cartList.append(clone);
    }
  });
}

function renderCatalog(movies, container) {
  container.textContent = "";
  const fragment = document.createDocumentFragment();

  movies.forEach((movie) => {
    const article = document.createElement("article");
    article.className = "movie-card overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl";
    article.dataset.id = String(movie.id);
    article.innerHTML = `
      <img src="${movie.poster}" alt="Постер" class="h-56 w-full object-cover">
      <div class="p-5">
        <h3 class="text-2xl font-bold text-slate-900">${movie.title} (${movie.info.year})</h3>
        <div class="mt-3 flex flex-wrap gap-2">
          <span class="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">Жанр: ${movie.category}</span>
          <span class="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-800">Рейтинг: ${movie.rating}/10</span>
          <span class="rounded-full bg-cyan-100 px-3 py-1 text-sm text-cyan-800">Квиток: ${movie.price} грн</span>
        </div>
        <p class="mt-4 text-base leading-7 text-slate-600">${movie.info.description}</p>
        <div class="mt-5 flex flex-wrap gap-3">
          <button type="button" class="details-btn rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100">Детальніше</button>
          <button type="button" class="buy-btn rounded-xl bg-cyan-600 px-4 py-2 font-semibold text-white transition hover:bg-cyan-700">Купити</button>
        </div>
      </div>`;
    fragment.append(article);
  });
  container.append(fragment);
}

function renderGenreOptions(selectElement) {
  if (!selectElement) return;
  new Set(movieAfisha.map((m) => m.category)).forEach((cat) => {
    const opt = document.createElement("option"); opt.value = cat; opt.textContent = cat; selectElement.append(opt);
  });
}

// ПР №3: FETCH АПІ СЕРІАЛІВ
async function loadApiMovies() {
  const container = document.getElementById('api-movies-container');
  const spinner = document.getElementById('loading-spinner');
  if (!container) return;

  try {
    const response = await fetch('https://api.tvmaze.com/search/shows?q=movie');
    const data = await response.json();
    if (spinner) spinner.style.display = 'none';
    
    container.innerHTML = '';
    data.slice(0, 6).forEach(item => {
      const show = item.show;
      const poster = show.image ? show.image.medium : 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=300&h=450&auto=format&fit=crop';
      const rating = show.rating && show.rating.average ? `⭐ ${show.rating.average}` : '⭐ 7.2';
      const year = show.premiered ? show.premiered.split('-')[0] : '2024';
      const genre = show.genres && show.genres.length > 0 ? show.genres[0] : 'Кіно';
      const isAdded = apiWatchlistManager.isInWatchlist(show.id);

      const card = document.createElement('div');
      card.className = 'flex flex-row rounded-2xl bg-white p-4 shadow-md border border-slate-100 transition hover:shadow-xl items-center gap-4';
      card.innerHTML = `
        <img src="${poster}" alt="img" class="h-40 w-28 rounded-xl object-cover bg-slate-100 flex-shrink-0">
        <div class="flex flex-col flex-grow justify-between h-40 py-1">
          <div>
            <span class="text-xs font-semibold uppercase tracking-wider text-cyan-600">${genre}</span>
            <h3 class="text-base font-bold text-slate-900 line-clamp-2 mt-0.5 leading-tight">${show.name}</h3>
            <p class="mt-1 text-sm text-slate-500">${year} | ${rating}</p>
          </div>
          <button data-id="${show.id}" class="api-toggle-btn w-full rounded-xl py-2 text-xs font-semibold border transition-all duration-200 text-center ${
            isAdded ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' : 'bg-cyan-50 border-cyan-200 text-cyan-600 hover:bg-cyan-100'
          }">${isAdded ? '🍿 Видалити' : '➕ В обране'}</button>
        </div>`;

      card.querySelector('.api-toggle-btn').addEventListener('click', function() {
        if (apiWatchlistManager.isInWatchlist(show.id)) {
          apiWatchlistManager.removeFromWatchlist(show.id);
          this.textContent = '➕ В обране';
          this.className = 'api-toggle-btn w-full rounded-xl py-2 text-xs font-semibold border transition-all duration-200 text-center bg-cyan-50 border-cyan-200 text-cyan-600 hover:bg-cyan-100';
        } else {
          apiWatchlistManager.addToWatchlist({ id: show.id, name: show.name, year });
          this.textContent = '🍿 Видалити';
          this.className = 'api-toggle-btn w-full rounded-xl py-2 text-xs font-semibold border transition-all duration-200 text-center bg-red-50 border-red-200 text-red-600 hover:bg-red-100';
        }
      });
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = `<div class="col-span-full text-center text-red-600">Помилка API</div>`;
  }
}

// Запускаємо логіку каталогу
document.addEventListener("DOMContentLoaded", () => {
  initCatalog();
  loadApiMovies();
});