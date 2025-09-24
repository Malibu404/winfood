// Product data
const products = [
  {
    image:
      "https://uploads.onecompiler.io/438a5mq9w/43xjbfs33/Mohinga%2060g%20copy.jpg",
    title: "Ready to Cook Mohinga",
    description:
      "Authentic Myanmar mohinga ready to cook - the nation's most beloved noodle soup.",
    fullDescription:
      "Our Ready to Cook Mohinga brings Myanmar's national dish to your kitchen with authentic flavors and traditional preparation methods. This beloved fish-based noodle soup is enriched with lemongrass, ginger, and aromatic spices, served with rice noodles and fresh herbs. Simply heat and enjoy the taste of Myanmar's culinary heritage, recommended by MasterChef Myanmar U Sharky.",
    ingredients: [
      "Fish Stock",
      "Rice Noodles",
      "Lemongrass",
      "Ginger",
      "Traditional Myanmar Spices",
      "Fish Paste",
      "Banana Stem",
      "Onions",
    ],
    nutritionFacts: {
      calories: "250 per serving",
      protein: "15g",
      carbs: "35g",
      fat: "8g",
      sodium: "750mg",
    },
    howToServe: [
      "Heat the mohinga broth in a pot for 5-7 minutes",
      "Cook rice noodles separately until tender",
      "Place noodles in bowl and pour hot broth over",
      "Garnish with fresh cilantro, crispy shallots, and lime wedges",
      "Serve with boiled eggs and traditional sides",
    ],
    rating: 4.9,
    reviews: 156,
  },
  {
    image:
      "https://uploads.onecompiler.io/438a5mq9w/43xjbfs33/Ambarella%20Fish%20Paste%20Curry.png",
    title: "Ambarella Fish Paste Curry",
    description:
      "Ready to eat ambarella fish paste curry - a tangy and flavorful traditional Myanmar dish.",
    fullDescription:
      "Our Ambarella Fish Paste Curry combines the unique tangy flavor of ambarella fruit with rich fish paste to create an authentic Myanmar curry experience. This ready-to-eat dish captures the perfect balance of sour, savory, and spicy flavors that Myanmar cuisine is famous for. Every meal is a taste of home, crafted with traditional recipes and premium ingredients.",
    ingredients: [
      "Fresh Ambarella",
      "Premium Fish Paste",
      "Traditional Curry Spices",
      "Coconut Oil",
      "Onions",
      "Garlic",
      "Chili",
      "Tamarind",
    ],
    nutritionFacts: {
      calories: "195 per serving",
      protein: "14g",
      carbs: "12g",
      fat: "10g",
      sodium: "680mg",
    },
    howToServe: [
      "Heat gently in microwave for 2-3 minutes or on stovetop",
      "Serve over steamed white rice",
      "Garnish with fresh cilantro and sliced chilies",
      "Perfect with Myanmar traditional vegetables",
      "Enjoy with family and friends for authentic experience",
    ],
    rating: 4.7,
    reviews: 143,
  },
  {
    image:
      "https://uploads.onecompiler.io/438a5mq9w/43xjbfs33/Mayan%20Fish%20Paste%20Curry.png",
    title: "Mayan Fish Paste Curry",
    description:
      "Ready to eat Mayan fish paste curry - a rich and aromatic traditional Myanmar curry.",
    fullDescription:
      "Our Mayan Fish Paste Curry showcases the deep, complex flavors of traditional Myanmar cuisine with its rich, aromatic profile. This ready-to-eat curry features premium fish paste slow-cooked with traditional spices and herbs to achieve the perfect balance of flavors. Every meal is a taste of home, bringing authentic Myanmar culinary traditions to your table with convenience and quality.",
    ingredients: [
      "Premium Fish Paste",
      "Myanmar Traditional Spices",
      "Coconut Milk",
      "Lemongrass",
      "Galangal",
      "Shallots",
      "Garlic",
      "Chili Peppers",
    ],
    nutritionFacts: {
      calories: "210 per serving",
      protein: "16g",
      carbs: "10g",
      fat: "12g",
      sodium: "720mg",
    },
    howToServe: [
      "Heat in microwave for 2-3 minutes or warm on stovetop",
      "Serve with steamed jasmine rice or Myanmar rice",
      "Add fresh vegetables like cucumber and cabbage",
      "Garnish with fresh herbs and lime",
      "Best enjoyed with traditional Myanmar side dishes",
    ],
    rating: 4.8,
    reviews: 178,
  },
];

// Global variables
let currentProductIndex = 0;
let isAutoPlaying = true;
let autoPlayInterval;
let currentView = "home";

// DOM elements
const header = document.getElementById("header");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const flipCard = document.getElementById("flip-card");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const autoplayBtn = document.getElementById("autoplay-btn");
const indicators = document.querySelectorAll(".indicator");
const mainContent = document.getElementById("main-content");
const productDetail = document.getElementById("product-detail");
const backBtn = document.getElementById("back-btn");

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeHeader();
  initializeCarousel();
  initializeMobileMenu();
  initializeProductDetail();
  addScrollAnimations();
});

// Header functionality
function initializeHeader() {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Mobile menu functionality
function initializeMobileMenu() {
  mobileMenuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    mobileMenuBtn.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenuBtn.classList.remove("active");
      mobileMenu.classList.remove("active");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileMenuBtn.classList.remove("active");
      mobileMenu.classList.remove("active");
    }
  });
}

// Smooth scrolling function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const headerHeight = header.offsetHeight;
    const sectionTop = section.offsetTop - headerHeight - 20;

    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });
  }
}

// Carousel functionality
function initializeCarousel() {
  updateCarousel();
  startAutoPlay();

  prevBtn.addEventListener("click", function () {
    stopAutoPlay();
    currentProductIndex =
      (currentProductIndex - 1 + products.length) % products.length;
    updateCarousel();
  });

  nextBtn.addEventListener("click", function () {
    stopAutoPlay();
    currentProductIndex = (currentProductIndex + 1) % products.length;
    updateCarousel();
  });

  autoplayBtn.addEventListener("click", function () {
    if (isAutoPlaying) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });

  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", function () {
      stopAutoPlay();
      currentProductIndex = index;
      updateCarousel();
    });
  });

  // Pause autoplay on hover
  flipCard.addEventListener("mouseenter", function () {
    if (isAutoPlaying) {
      clearInterval(autoPlayInterval);
    }
  });

  flipCard.addEventListener("mouseleave", function () {
    if (isAutoPlaying) {
      startAutoPlay();
    }
  });
}

function updateCarousel() {
  const currentProduct = products[currentProductIndex];

  // Update front face content
  document.getElementById("current-product-title").textContent =
    currentProduct.title;
  document.getElementById("current-product-description").textContent =
    currentProduct.description;

  // Update back face content
  document.getElementById("current-product-image").src = currentProduct.image;
  document.getElementById("current-product-image").alt = currentProduct.title;
  document.getElementById("back-product-title").textContent =
    currentProduct.title;

  // Update indicators
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentProductIndex);
  });
}

function startAutoPlay() {
  isAutoPlaying = true;
  autoplayBtn.innerHTML = "⏸";
  autoplayBtn.title = "Pause auto-rotation";

  autoPlayInterval = setInterval(function () {
    currentProductIndex = (currentProductIndex + 1) % products.length;
    updateCarousel();
  }, 4000);
}

function stopAutoPlay() {
  isAutoPlaying = false;
  autoplayBtn.innerHTML = "▶";
  autoplayBtn.title = "Start auto-rotation";
  clearInterval(autoPlayInterval);
}

// Product detail functionality
function initializeProductDetail() {
  backBtn.addEventListener("click", function () {
    hideProductDetail();
  });
}

function showProductDetail(productIndex) {
  const product = products[productIndex];
  currentView = "product";

  // Update product detail content
  document.getElementById("detail-image").src = product.image;
  document.getElementById("detail-image").alt = product.title;
  document.getElementById("detail-title").textContent = product.title;
  document.getElementById("detail-description").textContent =
    product.fullDescription;
  document.getElementById(
    "detail-reviews"
  ).textContent = `(${product.reviews} reviews)`;

  // Update rating stars
  const stars = document.querySelectorAll(".star");
  stars.forEach((star, index) => {
    star.classList.toggle("filled", index < Math.floor(product.rating));
  });

  // Update ingredients
  const ingredientsList = document.getElementById("ingredients-list");
  ingredientsList.innerHTML = "";
  product.ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.textContent = ingredient;
    ingredientsList.appendChild(li);
  });

  // Update nutrition facts
  const nutritionFacts = document.getElementById("nutrition-facts");
  nutritionFacts.innerHTML = "";
  Object.entries(product.nutritionFacts).forEach(([key, value]) => {
    const div = document.createElement("div");
    div.className = "nutrition-item";
    div.innerHTML = `
            <span class="nutrition-label">${key}:</span>
            <span class="nutrition-value">${value}</span>
        `;
    nutritionFacts.appendChild(div);
  });

  // Update how to serve
  const howToServeList = document.getElementById("how-to-serve");
  howToServeList.innerHTML = "";
  product.howToServe.forEach((step, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span class="step-number">${index + 1}</span>
            ${step}
        `;
    howToServeList.appendChild(li);
  });

  // Show product detail and hide main content
  mainContent.style.display = "none";
  productDetail.classList.add("active");

  // Scroll to top
  window.scrollTo(0, 0);
}

function hideProductDetail() {
  currentView = "home";
  productDetail.classList.remove("active");
  mainContent.style.display = "block";
}

// Scroll animations
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
      }
    });
  }, observerOptions);

  // Observe elements that should animate on scroll
  const animatedElements = document.querySelectorAll(
    ".product-card, .section-header, .contact-card, .about-image, .about-text"
  );
  animatedElements.forEach((el) => {
    el.style.animationPlayState = "paused";
    observer.observe(el);
  });
}

// Stagger animations for cards
function addStaggeredAnimations() {
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  const contactCards = document.querySelectorAll(".contact-card");
  contactCards.forEach((card, index) => {
    card.style.animationDelay = `${0.1 + index * 0.1}s`;
  });
}

// Call staggered animations after DOM is loaded
document.addEventListener("DOMContentLoaded", addStaggeredAnimations);

// Utility function to handle window resize
window.addEventListener("resize", function () {
  // Close mobile menu on resize to larger screen
  if (window.innerWidth >= 768) {
    mobileMenuBtn.classList.remove("active");
    mobileMenu.classList.remove("active");
  }
});

// Smooth scroll for all internal links
document.addEventListener("click", function (e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const targetId = e.target.getAttribute("href").substring(1);
    scrollToSection(targetId);
  }
});

// Add loading class to images
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.classList.add("loaded");
    });
    img.addEventListener("error", function () {
      this.classList.add("error");
    });
  });
});

// Keyboard navigation support
document.addEventListener("keydown", function (e) {
  if (currentView === "product" && e.key === "Escape") {
    hideProductDetail();
  }

  // Carousel keyboard navigation
  if (currentView === "home") {
    if (e.key === "ArrowLeft") {
      stopAutoPlay();
      currentProductIndex =
        (currentProductIndex - 1 + products.length) % products.length;
      updateCarousel();
    } else if (e.key === "ArrowRight") {
      stopAutoPlay();
      currentProductIndex = (currentProductIndex + 1) % products.length;
      updateCarousel();
    } else if (e.key === " ") {
      e.preventDefault();
      if (isAutoPlaying) {
        stopAutoPlay();
      } else {
        startAutoPlay();
      }
    }
  }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Debounced scroll handler for performance
const debouncedScrollHandler = debounce(function () {
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}, 10);

// Replace the original scroll listener
window.removeEventListener("scroll", initializeHeader);
window.addEventListener("scroll", debouncedScrollHandler);
