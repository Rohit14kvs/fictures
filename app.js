const auth = "563492ad6f917000010000017750bbd65e8744c8b4e85b3cc94c6fa0";

const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");

let searchValue;

//Event listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

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
                <p>${photo.photographer}</p>`;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  const data = await fetchAPI("https://api.pexels.com/v1/curated?per_page=16");

  generatePictures(data);
}

async function searchPhotos(query) {
  const data = await    fetchAPI(
    `https://api.pexels.com/v1/search?query=${query}&per_page=16`
  );
  generatePictures(data);
}

curatedPhotos();
