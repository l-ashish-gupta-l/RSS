// Function to set up dropdown interactions

function setupScrollEffect() {
  const navbar = document.getElementById("main-navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      // Threshold to trigger the change
      navbar.classList.add("bg-white", "text-[#1D233A]", "shadow-md");
      navbar.classList.remove("bg-transparent", "text-white");
    } else {
      navbar.classList.remove("bg-white", "text-[#1D233A]", "shadow-md");
      navbar.classList.add("bg-transparent", "text-[#1D233A]");
    }
  });
}

setupScrollEffect();

// Optionally, set up dropdowns here if needed
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-btn");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.add("hidden");
});

document.addEventListener("DOMContentLoaded", function () {
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      const parentLi = this.parentElement;
      const isActive = parentLi.classList.contains("dropdown-active");

      document.querySelectorAll(".dropdown-active").forEach((item) => {
        item.classList.remove("dropdown-active");
      });

      if (!isActive) {
        parentLi.classList.add("dropdown-active");
      }
    });
  });
});

class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;
    // console.log(current);

    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 100;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }
    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 100;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

document.addEventListener("DOMContentLoaded", init);

function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  new TypeWriter(txtElement, words, wait);
}
