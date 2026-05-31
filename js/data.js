"use strict";

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