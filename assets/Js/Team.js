
import {
  setupSidebarDropdowns,
  setupDropdown,
  initializeSidebar,
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

        // Initialize sidebar and dropdowns
        setupSidebarDropdowns();
        initializeSidebar();

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
    const response = await fetch("aboutUs.html");
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const section = doc.querySelector(".About_hero");

    if (section) {
      const container = document.getElementById("Hero-container");
      if (container) {
        container.appendChild(section);

        // Check if the page is Team detail
        const isTeamDetail = window.location.pathname.includes("Team_detail");

        if (isTeamDetail) {
          section.querySelector("h1").innerText = "Team Details";
          section.querySelector("h2").innerText = "Home -> Team Details";
        } else {
          section.querySelector("h1").innerText = "Team";
          section.querySelector("h2").innerText = "Home -> Team";
        }
      } else {
        console.error("Hero container element not found.");
      }
    } else {
      console.error("About_hero section not found in the about.html.");
    }
  } catch (error) {
    console.error("Error loading the About_hero section:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadContent);
