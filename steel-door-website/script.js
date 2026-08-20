const header = document.getElementById("siteHeader");
const heroImage = document.querySelector(".hero-image");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const modal = document.getElementById("quoteModal");
const modalClose = document.getElementById("modalClose");
const quoteForm = document.getElementById("quoteForm");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  if (header) {
    header.style.background = y > 40
      ? "rgba(9,9,9,.94)"
      : "rgba(9,9,9,.78)";
  }
  if (heroImage && y < window.innerHeight) {
    heroImage.style.transform = `scale(1.06) translateY(${y * 0.12}px)`;
  }
});

menuBtn?.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  menuBtn.textContent = mobileMenu.classList.contains("open") ? "×" : "☰";
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

function openModal() {
  modal.classList.add("show");
  document.body.classList.add("no-scroll");
}

function closeModal() {
  modal.classList.remove("show");
  document.body.classList.remove("no-scroll");
}

document.querySelectorAll("[data-open-quote]").forEach(btn => {
  btn.addEventListener("click", openModal);
});

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

quoteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you! Your project enquiry has been received.");
  quoteForm.reset();
  closeModal();
});

// Collection filter
document.querySelectorAll(".collection-tab").forEach(function(tab){
  tab.addEventListener("click",function(){
    document.querySelectorAll(".collection-tab").forEach(function(t){t.classList.remove("active")});
    tab.classList.add("active");
    const filter=tab.dataset.filter;
    document.querySelectorAll(".collection-product").forEach(function(card){
      card.classList.toggle("hidden", filter !== "all" && card.dataset.type !== filter);
    });
  });
});
