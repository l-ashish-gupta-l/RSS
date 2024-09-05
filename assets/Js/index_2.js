import {
  setupSidebarDropdowns,
  setupDropdown,
  initializeSidebar,
  setupScrollEffect,
} from "./about_script.js";

async function loadContent() {
  try {
    const response = await fetch("../index.html");
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    const navbar = doc.querySelector("#navbar-sidebar-container");
    const footer = doc.querySelector("#footer-main");

    if (navbar && footer) {
      const navbarContainer = document.getElementById("navbar-container");
      const footerContainer = document.getElementById("footer-container");

      if (navbarContainer && footerContainer) {
        navbarContainer.innerHTML = navbar.outerHTML;
        footerContainer.innerHTML = footer.outerHTML;

        document.querySelectorAll(".link").forEach((link) => {
          link.classList.add("text-white");
        });
        const menuBtn = document.querySelector("#menu-btn");
        menuBtn.classList.add("text-white");

        // Initialize sidebar and dropdowns
        setupSidebarDropdowns();
        initializeSidebar();
        setupScrollEffect();

        // Set up dropdowns for the main navbar
        setupDropdown("homeDropdownButton", "homeDropdownMenu");
        setupDropdown("pagesDropdownButton", "pagesDropdownMenu");
        setupDropdown("portfolioDropdownButton", "portfolioDropdownMenu");
        setupDropdown("ServicesDropdownButton", "ServicesDropdownMenu");
      } else {
        console.error("Navbar or footer container element not found.");
      }
    } else {
      console.error("Navbar or footer element not found in the index.html.");
    }
  } catch (error) {
    console.error("Error loading navbar or footer:", error);
  }

  try {
    const portfolioResponse = await fetch("Portfolio.html");
    if (!portfolioResponse.ok) {
      throw new Error(
        `Network response was not ok: ${portfolioResponse.statusText}`
      );
    }
    const portfolioText = await portfolioResponse.text();
    const portfolioDoc = new DOMParser().parseFromString(
      portfolioText,
      "text/html"
    );
    const worksSection = portfolioDoc.querySelector("#works");

    if (worksSection) {
      const workContainer = document.getElementById("work-container");
      if (workContainer) {
        workContainer.innerHTML = worksSection.outerHTML;
      } else {
        console.error("Work container element not found.");
      }
    } else {
      console.error("Works section not found in the Portfolio.html.");
    }
  } catch (error) {
    console.error("Error loading works section:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadContent);
