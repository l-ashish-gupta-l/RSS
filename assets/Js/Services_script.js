import {
  setupSidebarDropdowns,
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
    const Service_index = doc.querySelector("#Service_index");

    if (navbar && footer) {
      const navbarContainer = document.getElementById("navbar-container");
      const footerContainer = document.getElementById("footer-container");
      const ServiceContainer = document.getElementById("Services-container");

      if (navbarContainer && footerContainer) {
        navbarContainer.innerHTML = navbar.outerHTML;
        footerContainer.innerHTML = footer.outerHTML;
        ServiceContainer.innerHTML = Service_index.outerHTML;

        document.querySelectorAll(".link").forEach((link) => {
          link.classList.add("text-white");
        });
        const quoteBtn = document.querySelector(".quoetebtn");
        if (quoteBtn) {
          quoteBtn.classList.replace("bg-[#7432FF]", "bg-[#1D233A]");
        }

        // Initialize sidebar and dropdowns
        setupSidebarDropdowns();
        initializeSidebar();

        // Set up dropdowns for the main navbar
        

        setupScrollEffect();
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

        // Check if the page is Services detail
        const isServicesDetail =
          window.location.pathname.includes("Services_detail");

        if (isServicesDetail) {
          section.querySelector("h1").innerText = "Services Details";
          section.querySelector("h2").innerText = "Home -> Services Details";
        } else {
          section.querySelector("h1").innerText = "Services";
          section.querySelector("h2").innerText = "Home -> Services";
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
