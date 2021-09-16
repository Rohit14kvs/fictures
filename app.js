const auth = "563492ad6f917000010000017750bbd65e8744c8b4e85b3cc94c6fa0";

const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");

let searchValue;
let page = 1;
let fetchLink;
let currentSearch;

//Event listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

more.addEventListener("click", loadMore);

function updateInput(e) {
  // console.log(e.target.value);
  searchValue = e.target.value;
}

async function fetchAPI(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src = ${photo.src.large}></img>
                <div class="gallery-info">
                <a class="creator" href=${photo.photographer_url} target="_blank"><p>${photo.photographer}</p></a>
                <a href=${photo.src.original} target="_blank">Download</a>
                </div>`;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=16&page=1";
  const data = await fetchAPI(fetchLink);
    console.log(data);
  generatePictures(data);
}

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=16&page=1`;
  const data = await fetchAPI(fetchLink);
  generatePictures(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMore() {
  page++;

  if(currentSearch) {
  fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=16&page=${page}`;
  }
  else {
  fetchLink = `https://api.pexels.com/v1/curated?per_page=16&page=${page}`;
  }
  const data = await fetchAPI(fetchLink);
  generatePictures(data);
}

curatedPhotos();
