//Carrusel
const lightbox = document.getElementById("lightbox");
const carouselImage = document.getElementById("carouselImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const closeBtn = document.getElementById("closeBtn");

let currentIndex = 0;
let currentImages = [];

document.querySelectorAll(".timeline-images img").forEach((img) => {
  img.addEventListener("click", (e) => {
    const container = e.target.closest(".timeline-images");
    currentImages = Array.from(container.querySelectorAll("img")).map(
      (i) => i.src
    );
    currentIndex = currentImages.indexOf(e.target.src);

    showImage(currentIndex);
    lightbox.style.display = "flex";
  });
});

function showImage(index) {
  if (currentImages.length === 0) return;
  carouselImage.src = currentImages[index];
}

prevBtn.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + currentImages.length) % currentImages.length;
  showImage(currentIndex);
});
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  showImage(currentIndex);
});

// Cerrar carrusel
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.style.display = "none";
});
