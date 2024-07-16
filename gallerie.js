var allImages = []; // Initialize an empty array for images
var imagesArea = document.getElementById("images");
var cardTitle = document.querySelector(".gallerie .card-header");
var cardBody = document.querySelector(".gallerie .card-body");
var cardFooter = document.querySelector(".gallerie .card-footer");
var pagination = document.getElementById("pagination");
var indicator = document.getElementById("indicator");
var loader = document.getElementById("loader");
var index = 1; // Initialize a default index starting at 1

async function fetchJSONData() {
  loader.classList.add("active");
  try {
    const response = await fetch(
      "https://hamid-tlailia.github.io/Gallerie/gallerie.json"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    allImages = data.images; // Assign the parsed data to allImages
    renderImages(); // Call the function to render images
    updatePagination(); // Update pagination right after rendering images
    updateIndicator(); // Update indicator right after rendering images
  } catch (error) {
    console.error("Unable to fetch data:", error);
  } finally {
    setTimeout(() => {
      loader.classList.remove("active");
    }, 2000);
  }
}

function renderImages() {
  // Clear existing content
  cardTitle.innerHTML = "";
  cardBody.innerHTML = "";
  cardFooter.innerHTML = "";

  allImages.forEach((image, i) => {
    // Create elements for title, image, and description
    const titleElement = document.createElement("div");
    titleElement.textContent = image.image_title;
    titleElement.classList.add("title");
    titleElement.setAttribute("data-index", i + 1);

    const imageElement = document.createElement("img");
    imageElement.src = image.image_src;
    imageElement.setAttribute("id", "gallerie-image");
    imageElement.classList.add("img-fluid");
    imageElement.setAttribute("data-index", i + 1);
    imageElement.alt = "image";

    const descriptionElement = document.createElement("div");
    descriptionElement.textContent = image.image_description;
    descriptionElement.classList.add("description");
    descriptionElement.setAttribute("data-index", i + 1);

    // Append elements to respective card sections
    cardTitle.appendChild(titleElement);
    cardBody.appendChild(imageElement);
    cardFooter.appendChild(descriptionElement);

    // Add appropriate classes based on the current index
    if (i + 1 < index) {
      imageElement.classList.add("from-left");
    } else if (i + 1 > index) {
      imageElement.classList.add("from-right");
    }

    // Set active class only for the current image
    if (i + 1 === index) {
      titleElement.classList.add("active");

      imageElement.classList.add("active");
      descriptionElement.classList.add("active");
    }
  });
}

function updateClasses() {
  document.querySelectorAll("#gallerie-image").forEach((img) => {
    const imgIndex = Number(img.getAttribute("data-index"));
    img.classList.remove(
      "active",
      "from-left",
      "from-right",
      "rotate-rectangle"
    );

    if (imgIndex < index) {
      img.classList.add("from-left");
    } else if (imgIndex > index) {
      img.classList.add("from-right");
    } else {
      img.classList.add("active", "rotate-rectangle");
    }
  });

  document.querySelectorAll(".title").forEach((title) => {
    const titleIndex = Number(title.getAttribute("data-index"));
    title.classList.remove("active");

    if (titleIndex === index) {
      title.classList.add("active");
    }
  });

  document.querySelectorAll(".description").forEach((description) => {
    const descriptionIndex = Number(description.getAttribute("data-index"));
    description.classList.remove("active");

    if (descriptionIndex === index) {
      description.classList.add("active");
    }
  });

  updatePagination();
  updateIndicator();
}

function updatePagination() {
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
      <li class="page-item ${p === index ? "active" : ""}" data-index="${p}">
        <a class="page-link" href="#">${p}</a>
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

  // Add event listeners for pagination buttons
  document.getElementById("prev").onclick = (e) => {
    e.preventDefault();
    if (index > 1) {
      index--;
      updateClasses();
    }
  };
  document.getElementById("next").onclick = (e) => {
    e.preventDefault();
    if (index < totalPages) {
      index++;
      updateClasses();
    }
  };

  document.querySelectorAll(".page-item[data-index]").forEach((number) => {
    number.onclick = (e) => {
      e.preventDefault();
      index = Number(number.getAttribute("data-index"));
      updateClasses();
    };
  });
}

function updateIndicator() {
  indicator.innerText = `${index} / ${allImages.length}`;
}

fetchJSONData(); // Call the function to fetch data
