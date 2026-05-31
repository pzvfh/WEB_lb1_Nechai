"use strict";

console.log("Спільний скрипт (main.js) підключено.");

// 1. Логіка мобільного меню
function initMobileMenu() {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// 2. Оновлення лічильника ПР№3 в шапці (щоб він не зникав на інших сторінках)
function updateGlobalWatchlistBadge() {
  const badge = document.getElementById('watchlist-count');
  if (badge) {
    const watchlist = JSON.parse(localStorage.getItem('cinemaWatchlist')) || [];
    badge.textContent = watchlist.length;
  }
}

// Запускаємо при завантаженні будь-якої сторінки
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  updateGlobalWatchlistBadge();
});