// Function to set up dropdown interactions
export function setupDropdown(buttonId, menuId) {
  const dropdownButton = document.getElementById(buttonId);
  const dropdownMenu = document.getElementById(menuId);

  if (!dropdownButton || !dropdownMenu) {
    console.error(
      `Dropdown elements not found for IDs: ${buttonId}, ${menuId}`
    );
    return;
  }

  dropdownButton.addEventListener("mouseenter", function () {
    dropdownMenu.classList.remove("hidden");
  });

  dropdownButton.addEventListener("mouseleave", function () {
    dropdownMenu.classList.add("hidden");
  });

  dropdownMenu.addEventListener("mouseenter", function () {
    dropdownMenu.classList.remove("hidden");
  });

  dropdownMenu.addEventListener("mouseleave", function () {
    dropdownMenu.classList.add("hidden");
  });
}

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
setupDropdown("homeDropdownButton", "homeDropdownMenu");
setupDropdown("pagesDropdownButton", "pagesDropdownMenu");
setupDropdown("portfolioDropdownButton", "portfolioDropdownMenu");
setupDropdown("ServicesDropdownButton", "ServicesDropdownMenu");

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
