// Масив фільмів 
const movieAfisha = [
  { id: 1, title: "Дюна: Частина друга", info: { director: "Дени Вільньов", year: 2024 }, rating: 9.0, is3D: true },
  { id: 2, title: "Опенгеймер", info: { director: "Крістофер Нолан", year: 2023 }, rating: 8.6, is3D: false },
  { id: 3, title: "Кунг-фу Панда 4", info: { director: "Майк Мітчелл", year: 2024 }, rating: 7.2, is3D: true },
  { id: 4, title: "Бідні-нещасні", info: { director: "Йоргос Лантімос", year: 2023 }, rating: 8.3, is3D: false },
  { id: 5, title: "Мисливці на привидів", info: { director: "Гіл Кінан", year: 2024 }, rating: 6.5, is3D: true }
];


const highRatedMovies = movieAfisha.filter(movie => movie.rating > 8);

console.log("Фільми з рейтингом > 8:", highRatedMovies);



const movieTitles = movieAfisha.map(movie => movie.title);

console.log("Назви фільмів:", movieTitles);


const formats = new Set(movieAfisha.map(movie => movie.is3D));

console.log("Унікальні формати (true = 3D):", [...formats]);


const ratingMap = new Map();

movieAfisha.forEach(movie => {
  ratingMap.set(movie.title, movie.rating);
});

console.log("Рейтинг 'Опенгеймер':", ratingMap.get("Опенгеймер"));