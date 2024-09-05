export function setupSidebarDropdowns() {
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
}

 export function setupScrollEffect() {
   const navbar = document.getElementById("main-navbar");
   const links = document.querySelectorAll("#main-navbar .link"); // Select all links inside the navbar

   window.addEventListener("scroll", () => {
     if (window.scrollY > 50) {
       // Threshold to trigger the change
       navbar.classList.add("bg-white", "shadow-md");
       navbar.classList.remove("bg-transparent");

       // Change the text color of the links when scrolled down
       links.forEach((link) => {
         link.classList.add("text-[#1D233A]"); // Change to your desired color
         link.classList.remove("text-white");
       });
     } else {
       navbar.classList.remove("bg-white", "shadow-md");
       navbar.classList.add("bg-transparent");

       // Revert text color to white when scrolling back to top
       links.forEach((link) => {
         link.classList.add("text-white");
         link.classList.remove("text-[#1D233A]");
       });
     }
   });
 }

export function setupDropdown(buttonId, menuId) {
  const dropdownButton = document.getElementById(buttonId);
  const dropdownMenu = document.getElementById(menuId);

  if (!dropdownButton || !dropdownMenu) {
    console.error(
      `Dropdown elements not found for IDs: ${buttonId}, ${menuId}`
    );
    return;
  }

  // Add click-based dropdown toggle
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

// Initialize sidebar functionality
export function initializeSidebar() {
  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-btn");
  const sidebar = document.getElementById("sidebar");

  if (menuBtn && closeBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.remove("hidden");
    });

    closeBtn.addEventListener("click", () => {
      sidebar.classList.add("hidden");
    });
  }
}

// Load content dynamically and set up functionality
async function loadContent() {
  try {
    const response = await fetch("../index.html");
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    const navbarSidebarContainer = doc.querySelector(
      "#navbar-sidebar-container"
    );
    const AboutUs = doc.querySelector("#AboutUs-main");
    const Experience = doc.querySelector("#Experience-main");
    const footer = doc.querySelector("#footer-main");

    if (navbarSidebarContainer) {
      const navbarContainer = document.getElementById("navbar-container");
      const AboutUsContainer = document.getElementById("AboutUs-container");
      const ExperienceContainer = document.getElementById(
        "Experience-container"
      );
      const footerContainer = document.getElementById("footer-container");
      if (navbarContainer) {
        navbarContainer.innerHTML = navbarSidebarContainer.outerHTML;
        AboutUsContainer.innerHTML = AboutUs.outerHTML;
        ExperienceContainer.innerHTML = Experience.outerHTML;
        footerContainer.innerHTML = footer.outerHTML;

        document.querySelectorAll(".link").forEach((link) => {
          link.classList.add("text-white");
        });
        const quoteBtn = document.querySelector(".quoetebtn");
        if (quoteBtn) {
          quoteBtn.classList.replace("bg-[#7432FF]", "bg-[#1D233A]");
        }

        setupSidebarDropdowns();
        initializeSidebar();

        // Set up dropdowns
        setupDropdown("homeDropdownButton", "homeDropdownMenu");
        setupDropdown("pagesDropdownButton", "pagesDropdownMenu");
        setupDropdown("portfolioDropdownButton", "portfolioDropdownMenu");
        setupDropdown("ServicesDropdownButton", "ServicesDropdownMenu");

        setupScrollEffect();
      } else {
        console.error("Navbar container element not found.");
      }
    } else {
      console.error(
        "Navbar/Sidebar container element not found in the index.html."
      );
    }
  } catch (error) {
    console.error("Error loading navbar and sidebar:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadContent);
