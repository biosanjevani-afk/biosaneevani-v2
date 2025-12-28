// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close menu when clicking on a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// our partner
document.querySelectorAll('.select-btn').forEach(button => {
  button.onclick = () => {
    // Get the associated menu for the clicked button
    const menu = button.nextElementSibling; // The <ul> with the class 'select-menu'

    // Close all menus first
    document.querySelectorAll('.select-menu').forEach(m => {
      if (m !== menu) {
        m.classList.remove('show');
      }
    });

    // Toggle the clicked menu
    menu.classList.toggle('show');
  };
});



// About Carousel
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-item");
const indicators = document.querySelectorAll(".indicator");

function showSlide(n) {
  slides.forEach((slide) => slide.classList.remove("active"));
  indicators.forEach((indicator) => indicator.classList.remove("active"));

  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  indicators[currentSlide].classList.add("active");
}

indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => showSlide(index));
});

setInterval(() => {
  showSlide(currentSlide + 1);
}, 3000);

// Blog Carousel
let blogIndex = 0;
const blogTrack = document.getElementById("blogTrack");
const blogCards = document.querySelectorAll(".blog-card");
const blogPrev = document.getElementById("blogPrev");
const blogNext = document.getElementById("blogNext");

function updateBlog() {
  blogTrack.style.transform = `translateX(-${blogIndex * 100}%)`;
}

blogNext.addEventListener("click", () => {
  blogIndex = (blogIndex + 1) % blogCards.length;
  updateBlog();
});

blogPrev.addEventListener("click", () => {
  blogIndex = (blogIndex - 1 + blogCards.length) % blogCards.length;
  updateBlog();
});

// Initialize EmailJS (add your public key)
emailjs.init("xGU0UoAb2xYFchaTI");

const submitBtn = document.getElementsByClassName("submit-btn")[0];

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all required fields.");
    return;
  }

  const params = {
    name: name,
    email: email,
    phone: phone,
    message: message,
  };

  emailjs
    .send(
      "service_st3gljs",     // ✅ Service ID
      "template_6asznfk",    // ✅ Template ID (IMPORTANT)
      params
    )
    .then(() => {
      alert("Thank you for your message! We will get back to you soon.");

      // Clear form
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("message").value = "";
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("Failed to send message. Please try again later.");
    });
});


// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document
  .querySelectorAll(".partner-card, .blog-card, .about-content")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });
