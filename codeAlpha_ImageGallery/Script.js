// Get all gallery images
const galleryItems = document.querySelectorAll(".gallery-item");

// Get filter buttons
const filterButtons = document.querySelectorAll(".filter-btn");

// Get lightbox elements
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// Store currently visible images
let visibleItems = [];
let currentIndex = 0;


// ===============================
// FILTER IMAGES
// ===============================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class to clicked button
        button.classList.add("active");

        const category = button.getAttribute("data-category");

        galleryItems.forEach(item => {

            if (
                category === "all" ||
                item.getAttribute("data-category") === category
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

        updateVisibleItems();
    });

});


// ===============================
// UPDATE VISIBLE IMAGES
// ===============================

function updateVisibleItems() {

    visibleItems = Array.from(galleryItems).filter(item => {
        return item.style.display !== "none";
    });

}


// ===============================
// OPEN LIGHTBOX
// ===============================

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        updateVisibleItems();

        currentIndex = visibleItems.indexOf(item);

        showImage();

        lightbox.style.display = "flex";

    });

});


// ===============================
// SHOW IMAGE
// ===============================

function showImage() {

    const image = visibleItems[currentIndex].querySelector("img");

    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;

}


// ===============================
// NEXT IMAGE
// ===============================

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= visibleItems.length) {
        currentIndex = 0;
    }

    showImage();

});


// ===============================
// PREVIOUS IMAGE
// ===============================

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleItems.length - 1;
    }

    showImage();

});


// ===============================
// CLOSE LIGHTBOX
// ===============================

closeBtn.addEventListener("click", () => {

    lightbox.style.display = "none";

});


// ===============================
// CLOSE WHEN CLICKING OUTSIDE IMAGE
// ===============================

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }

});


// Initially show all images
updateVisibleItems();

// ===============================
// KEYBOARD CONTROLS
// ===============================

document.addEventListener("keydown", (event) => {

    // Only work when lightbox is open
    if (lightbox.style.display === "flex") {

        if (event.key === "ArrowRight") {
            currentIndex++;

            if (currentIndex >= visibleItems.length) {
                currentIndex = 0;
            }

            showImage();
        }


        if (event.key === "ArrowLeft") {
            currentIndex--;

            if (currentIndex < 0) {
                currentIndex = visibleItems.length - 1;
            }

            showImage();
        }


        if (event.key === "Escape") {
            lightbox.style.display = "none";
        }

    }

});