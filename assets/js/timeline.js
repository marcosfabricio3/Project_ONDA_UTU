const items = document.querySelectorAll(".timeline-item");
const showOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.8;
  items.forEach((item) => {
    const boxTop = item.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      item.classList.add("show");
    }
  });
};
window.addEventListener("scroll", showOnScroll);
showOnScroll();

const miniTimeline = document
  .getElementById("miniTimeline")
  .querySelectorAll("span");
miniTimeline.forEach((span) => {
  span.addEventListener("click", () => {
    miniTimeline.forEach((s) => s.classList.remove("active"));
    span.classList.add("active");

    const year = span.getAttribute("data-year");
    const target = document.querySelector(
      `.timeline-item[data-year="${year}"]`
    );
    if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});
