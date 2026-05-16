"use strict";

console.log("script.js підключився");

const movieAfisha = [
  {
    id: 1,
    title: "Mad Max: Fury Road",
    price: 180,
    category: "Екшн",
    info: {
      director: "Джордж Міллер",
      year: 2015,
      description: "Шалена гонитва пустелею, де виживання залежить від швидкості та миттєвих рішень."
    },
    rating: 8.1,
    is3D: true,
    poster: "assets/posters/mad-max-fury-road.jpg"
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    price: 160,
    category: "Драма",
    info: {
      director: "Френк Дарабонт",
      year: 1994,
      description: "Історія надії, гідності та витримки навіть у найважчих обставинах."
    },
    rating: 9.2,
    is3D: false,
    poster: "assets/posters/the-shawshank-redemption.jpg"
  },
  {
    id: 3,
    title: "The Grand Budapest Hotel",
    price: 150,
    category: "Комедія",
    info: {
      director: "Вес Андерсон",
      year: 2014,
      description: "Стильна іронічна історія про пригоди консьєржа та його молодого помічника."
    },
    rating: 8.0,
    is3D: false,
    poster: "assets/posters/the-grand-budapest-hotel.jpg"
  },
  {
    id: 4,
    title: "Get Out",
    price: 170,
    category: "Жахи",
    info: {
      director: "Джордан Піл",
      year: 2017,
      description: "Візит до родини дівчини перетворюється на тривожну пастку з дивними правилами."
    },
    rating: 7.8,
    is3D: false,
    poster: "assets/posters/get-out.jpg"
  },
  {
    id: 5,
    title: "Knives Out",
    price: 175,
    category: "Детектив",
    info: {
      director: "Раян Джонсон",
      year: 2019,
      description: "Розслідування смерті письменника, у якому кожен герой щось приховує."
    },
    rating: 7.9,
    is3D: false,
    poster: "assets/posters/knives-out.jpg"
  },
  {
    id: 6,
    title: "Interstellar",
    price: 200,
    category: "Sci-Fi",
    info: {
      director: "Крістофер Нолан",
      year: 2014,
      description: "Місія за межі Сонячної системи починається тоді, коли Земля майже втратила шанс на порятунок."
    },
    rating: 8.6,
    is3D: true,
    poster: "assets/posters/interstellar.jpg"
  }
];

const priceMap = new Map();

movieAfisha.forEach((movie) => {
  priceMap.set(movie.title.toLowerCase(), movie.price);
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM завантажився");

  initMobileMenu();
  initCatalog();
  initContactForm();
});

function initMobileMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

function initCatalog() {
  const catalogContainer = document.getElementById("catalog-body");
  const genreFilter = document.getElementById("genre-filter");
  const searchInput = document.getElementById("movie-search");
  const priceResult = document.getElementById("price-result");
  const cartList = document.getElementById("cart-list");

  if (!catalogContainer) {
    console.log("catalog-body не знайдено на цій сторінці");
    return;
  }

  renderCatalog(movieAfisha, catalogContainer);
  renderGenreOptions(genreFilter);

  if (genreFilter) {
    genreFilter.addEventListener("change", () => {
      const selectedCategory = genreFilter.value;

      const filteredMovies =
        selectedCategory === "all"
          ? movieAfisha
          : movieAfisha.filter((movie) => movie.category === selectedCategory);

      renderCatalog(filteredMovies, catalogContainer);
    });
  }

  if (searchInput && priceResult) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();

      if (!query) {
        priceResult.textContent = "Введіть назву фільму";
        return;
      }

      if (priceMap.has(query)) {
        priceResult.textContent = `Ціна квитка: ${priceMap.get(query)} грн`;
      } else {
        priceResult.textContent = "Фільм не знайдено";
      }
    });
  }

  catalogContainer.addEventListener("click", (event) => {
    const detailsButton = event.target.closest(".details-btn");
    const buyButton = event.target.closest(".buy-btn");
    const movieCard = event.target.closest(".movie-card");

    if (!movieCard) return;

    const movieId = Number(movieCard.dataset.id);
    const movie = movieAfisha.find((item) => item.id === movieId);

    if (!movie) return;

    if (detailsButton) {
      movieCard.classList.toggle("movie-selected");

      alert(
        `${movie.title} (${movie.info.year})\n` +
        `Режисер: ${movie.info.director}\n` +
        `Рейтинг: ${movie.rating}/10\n\n` +
        movie.info.description
      );
    }

    if (buyButton && cartList) {
      addMovieToCart(movieCard, cartList);
    }
  });
}

function renderCatalog(movies, container) {
  container.textContent = "";

  const fragment = document.createDocumentFragment();

  movies.forEach((movie) => {
    const article = document.createElement("article");
    article.className =
      "movie-card overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl";
    article.dataset.id = String(movie.id);

    const img = document.createElement("img");
    img.src = movie.poster;
    img.alt = `Постер ${movie.title}`;
    img.className = "h-56 w-full object-cover";

    const content = document.createElement("div");
    content.className = "p-5";

    const title = document.createElement("h3");
    title.className = "text-2xl font-bold text-slate-900";
    title.textContent = `${movie.title} (${movie.info.year})`;

    const meta = document.createElement("div");
    meta.className = "mt-3 flex flex-wrap gap-2";

    const category = document.createElement("span");
    category.className =
      "rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700";
    category.textContent = `Жанр: ${movie.category}`;

    const rating = document.createElement("span");
    rating.className =
      "rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-800";
    rating.textContent = `Рейтинг: ${movie.rating}/10`;

    const price = document.createElement("span");
    price.className =
      "rounded-full bg-cyan-100 px-3 py-1 text-sm text-cyan-800";
    price.textContent = `Квиток: ${movie.price} грн`;

    const description = document.createElement("p");
    description.className = "mt-4 text-base leading-7 text-slate-600";
    description.textContent = movie.info.description;

    const actions = document.createElement("div");
    actions.className = "mt-5 flex flex-wrap gap-3";

    const detailsButton = document.createElement("button");
    detailsButton.type = "button";
    detailsButton.className =
      "details-btn rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100";
    detailsButton.textContent = "Детальніше";

    const buyButton = document.createElement("button");
    buyButton.type = "button";
    buyButton.className =
      "buy-btn rounded-xl bg-cyan-600 px-4 py-2 font-semibold text-white transition hover:bg-cyan-700";
    buyButton.textContent = "Купити";

    meta.append(category, rating, price);
    actions.append(detailsButton, buyButton);
    content.append(title, meta, description, actions);
    article.append(img, content);

    fragment.append(article);
  });

  container.append(fragment);
}

function renderGenreOptions(selectElement) {
  if (!selectElement) return;

  const uniqueCategories = new Set(movieAfisha.map((movie) => movie.category));

  uniqueCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    selectElement.append(option);
  });
}

function addMovieToCart(movieCard, cartList) {
  const clone = movieCard.cloneNode(true);

  clone.classList.add("cart-animate");
  clone.classList.remove("hover:-translate-y-1", "hover:shadow-2xl");

  clone.querySelectorAll("button").forEach((button) => {
    button.remove();
  });

  cartList.append(clone);
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (formStatus) {
      formStatus.textContent =
        "Форма успішно оброблена JavaScript без перезавантаження сторінки.";
    }

    console.log("Форма відправлена без перезавантаження сторінки.");
  });
}