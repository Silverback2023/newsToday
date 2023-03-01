const API_KEY = "ec15354c02484e54a9536f4e53f0005a";
const API_ENDPOINT = "https://newsapi.org/v2/top-headlines";

function searchNews() {
  const query = document.getElementById("searchInput").value;
  const url = `${API_ENDPOINT}?country=us&q=${query}&apiKey=${API_KEY}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const newsList = document.getElementById("newsList");
      newsList.innerHTML = "";
      data.articles.forEach(article => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = article.url;
        link.textContent = article.title;
        li.appendChild(link);
        newsList.appendChild(li);
      });
    })
    .catch(error => {
      console.error(error);
    });
}

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const newsBox = document.querySelectorAll(".newsBox");

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase();
  newsBox.forEach(box => {
    const newsTitle = box.querySelector(".newsTitle").textContent.toLowerCase();
    const newsDescription = box.querySelector(".newsDescription").textContent.toLowerCase();
    box.style.display = newsTitle.includes(searchTerm) || newsDescription.includes(searchTerm) ? "block" : "none";
  });
});

const breakingImg = document.querySelector("#breakingImg");
const breakingNewsTitle = document.querySelector("#breakingNews .title");
const breakingNewsDesc = document.querySelector("#breakingNews .description");
const topNews = document.querySelector(".topNews");
const sportsNews = document.querySelector("#sportsNews .newsBox");
const businessNews = document.querySelector("#businessNews .newsBox");
const techNews = document.querySelector("#techNews .newsBox");
const header = document.querySelector(".header");
const toggleMenu = document.querySelector(".bar");
const menu = document.querySelector("nav ul");

const toggle = () => {
  toggleMenu.classList.toggle("active");
  menu.classList.toggle("activeMenu");
};

toggleMenu.addEventListener("click", toggle);

window.addEventListener("scroll", () => {
  header.classList.toggle("sticky", window.scrollY > 50);
});

const apiKey = "29f8e42efe874ee2be23f0d1edb6844b";

const fetchData = async (category, pageSize) => {
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data.articles;
};

const addBreakingNews = data => {
  breakingImg.innerHTML = `<img src=${data[0].urlToImage} alt="image">`;
  breakingNewsTitle.innerHTML = `<a href=${data[0].url} target="_blank"><h2>${data[0].title}</h2></a>`;
  breakingNewsDesc.innerHTML = `${data[0].description}`;
};

fetchData("general", 5).then(addBreakingNews);

const addNews = (data, container, count) => {
  let html = "";
  data.forEach(element => {
    const title = element.title.length < 100 ? element.title : `${element.title.slice(0, 100)}...`;
    html += `
      <div class="newsCard">
        <div class="img">
          <img src=${element.urlToImage} alt="image">
        </div>
        <div class="text">
          <div class="title">
            <a href=${element.url} target
