document.addEventListener("DOMContentLoaded", () => {
  // --- CAROUSEL SCROLL CONTROLLER ---
  const movieSlider = document.getElementById("movieSlider");
  const scrollLeftAction = document.querySelector(".control-left");
  const scrollRightAction = document.querySelector(".control-right");

  if (movieSlider && scrollLeftAction && scrollRightAction) {
    const scrollIncrement = 320;

    scrollLeftAction.addEventListener("click", () => {
      movieSlider.scrollBy({ left: -scrollIncrement, behavior: "smooth" });
    });

    scrollRightAction.addEventListener("click", () => {
      movieSlider.scrollBy({ left: scrollIncrement, behavior: "smooth" });
    });
  }

  // --- FAQ ACCORDION ENGINE ---
  const accordionTriggers = document.querySelectorAll(".accordion-trigger");

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const currentItem = trigger.parentElement;
      const isExpanded = currentItem.classList.contains("expanded-state");

      document.querySelectorAll(".accordion-item").forEach(item => {
        item.classList.remove("expanded-state");
      });

      if (!isExpanded) {
        currentItem.classList.add("expanded-state");
      }
    });
  });

  // --- MODAL EVENT BINDINGS ---
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", window.closeMovieModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", window.closeMovieModal);

  window.addEventListener("keydown", (e) => {
    const movieModal = document.getElementById("movieModal");
    if (e.key === "Escape" && movieModal && movieModal.classList.contains("modal-active")) {
      window.closeMovieModal();
    }
  });
});

// --- GLOBAL MODAL INJECTION FUNCTION ---
window.openMovieModal = function(cardElement) {
  const movieModal = document.getElementById("movieModal");
  
  const modalBanner = document.getElementById("modalBanner");
  const modalTitle = document.getElementById("modalTitle");
  const modalYear = document.getElementById("modalYear");
  const modalRating = document.getElementById("modalRating");
  const modalType = document.getElementById("modalType");
  const modalGenre = document.getElementById("modalGenre");
  const modalDescription = document.getElementById("modalDescription");

  if (movieModal) {
    const title = cardElement.getAttribute("data-title") || "";
    const posterImg = cardElement.querySelector("img");
    const image = cardElement.getAttribute("data-image") || (posterImg ? posterImg.src : "");

    const year = cardElement.getAttribute("data-year") || "";
    const rating = cardElement.getAttribute("data-rating") || "";
    const type = cardElement.getAttribute("data-type") || "";
    dataGenre = cardElement.getAttribute("data-genre") || "";
    const desc = cardElement.getAttribute("data-desc") || "";

    if (modalTitle) modalTitle.textContent = title;
    if (modalYear) modalYear.textContent = year;
    if (modalRating) modalRating.textContent = rating;
    if (modalType) modalType.textContent = type;
    if (modalGenre) modalGenre.textContent = dataGenre;
    if (modalDescription) modalDescription.textContent = desc;

    if (modalBanner && image) {
      modalBanner.style.backgroundImage = `url('${image}')`;
    }

    movieModal.classList.add("modal-active");
    document.body.style.overflow = "hidden"; 
  }
};

window.closeMovieModal = function() {
  const movieModal = document.getElementById("movieModal");
  if (movieModal) {
    movieModal.classList.remove("modal-active");
    document.body.style.overflow = ""; 
  }
};
