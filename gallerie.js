var allImages = []; // Initialize an empty array for images
var imagesArea = document.getElementById("images");
var cardTitle = document.querySelector(".gallerie .card-header");
var cardBody = document.querySelector(".gallerie .card-body");
var cardFooter = document.querySelector(".gallerie .card-footer");
var pagination = document.getElementById("pagination")
var indicator = document.getElementById("indicator")
var loader = document.getElementById("loader")
var index = 0; // Initialize a default index
async function fetchJSONData() {
  loader.classList.add("active")
  try {
    
    const response = await fetch("./gallerie.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    setTimeout(() => {
      loader.classList.remove("active")
    },2000)
    const data = await response.json();
    allImages = data.images; // Assign the parsed data to allImages
    renderImages(); // Call the function to render images
  } catch (error) {
    console.error("Unable to fetch data:", error);
  }
}

function renderImages() {
  allImages.forEach((image) => {
    // Create elements for title, image, and description
    const titleElement = document.createElement("div");
    titleElement.textContent = image.image_title;
    const imageElement = document.createElement("img");
    imageElement.src = image.image_src;
    imageElement.setAttribute("id","gallerie-image")
    imageElement.classList.add("img-fluid");
    imageElement.setAttribute("data-index",index++);
    imageElement.alt = "image";
    const descriptionElement = document.createElement("div");
    descriptionElement.textContent = image.image_description;

    // Append elements to respective card sections
    cardTitle.appendChild(titleElement);
    cardBody.appendChild(imageElement);
    cardFooter.appendChild(descriptionElement);
  });
  index = 1;
}

fetchJSONData(); // Call the function to fetch data

// Show index function (not sure what you want to do with this)
setInterval(() => {
  
  const images = document.querySelectorAll("#gallerie-image");

for (var i = 0; i < images.length; i++) {
  var imageIndex = images[i].getAttribute("data-index");
  var stringifiedIndex = Number(imageIndex);
  var title = images[i].parentNode.parentNode.firstElementChild.children[i];
  var description = images[i].parentNode.parentNode.lastElementChild.children[i];

  // Do something with the image index
  if (stringifiedIndex === index - 1) {
    // Add "active" class to respective elements
    images[i].classList.add("active");
    images[i].classList.remove("from-right")
    images[i].classList.remove("from-left")
    title.classList.add("active");
    description.classList.add("active");
    
  } else {
    images[i].classList.remove("active");
    title.classList.remove("active");
    description.classList.remove("active");
    if(stringifiedIndex < index-1){
      images[i].classList.add("from-left")
    }else {
      images[i].classList.add("from-right")
    }
  }
}

 
 // Assuming you have an element with the ID "pagination" where you want to display the pagination
var pagination = document.getElementById("pagination");

// Initialize the total number of pages (you can adjust this based on your data)
var totalPages = allImages.length;

// Create the pagination HTML dynamically
var pages = `
  <li class="page-item" id="prev">
    <a class="page-link" href="#" aria-label="Previous">
      <span aria-hidden="true">«</span>
    </a>
  </li>
`;

for (var p = 1; p <= totalPages; p++) {
  pages += `
    <li class="page-item ${p === index ? "active":""}" id="pageNumber" data-index ="${p}">
      <a class="page-link"  href="#">${p}</a>
    </li>
  `;
}

pages += `
  <li class="page-item" id="next">
    <a class="page-link" href="#" aria-label="Next">
      <span aria-hidden="true">»</span>
    </a>
  </li>
`;

// Set the pagination HTML
pagination.innerHTML = pages;

 // add next and prev btns function
 var prev = document.getElementById("prev")
 var next = document.getElementById("next")
 // control prev , next , number btns
 var numbers = document.querySelectorAll("#pageNumber")
 if(index === 1){
   prev.classList.add("disabled")
 }
 if(index === 6){
   next.classList.add("disabled")
 }
 
 // next , prev functions
 prev.onclick = () => {
  index--; 
 }
 next.onclick = () => {
   index++;
 }
 
 // add click event to page numbers
 
 numbers.forEach(number => {
   
   var pageIndex = number.getAttribute("data-index")
   var numberIndex = Number(pageIndex)
   number.addEventListener('click', (e) => {
    index = numberIndex
   })
 })
 
 // set indicator current page numner of total pages
 indicator.innerText =`${index} / ${allImages.length}`
}, 100);


