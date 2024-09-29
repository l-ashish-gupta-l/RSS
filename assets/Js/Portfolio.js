import {
  initializeSidebar,
  setupScrollEffect,
} from "./about_script.js";

async function loadContent() {
   const loader = document.getElementById("loader");
  try {
     loader.classList.remove("hidden");
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
        const quoteBtn = document.querySelector(".quoetebtn");
        if (quoteBtn) {
          quoteBtn.classList.replace("bg-[#7432FF]", "bg-[#1D233A]");
        }

        // Initialize sidebar and dropdowns
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
  
        // Check if the page is a Portfolio detail page
        const isPortfolioDetail =
          window.location.pathname.includes("Portfolio_detail");
  
        if (isPortfolioDetail) {
          section.querySelector("h1").innerText = "Portfolio Details";
  
          // Update h2 text and include the arrow image
          const h2 = section.querySelector("h2");
          h2.innerHTML = `Home <span><img src="/assets/images/arrow_svg.svg" class="w-4 md:w-5" /></span> Portfolio Details`;
        } else {
          section.querySelector("h1").innerText = "Portfolio";
  
          // Update h2 text and include the arrow image
          const h2 = section.querySelector("h2");
          h2.innerHTML = `Home <span><img src="/assets/images/arrow_svg.svg" class="w-4 md:w-5" /></span> Portfolio`;
        }
      } else {
        console.error("Hero container element not found.");
      }
    } else {
      console.error("About_hero section not found in the about.html.");
    }
  } catch (error) {
    console.error("Error loading the About_hero section:", error);
  } finally {
    // Hide loader once content is loaded or an error has occurred
    loader.classList.add("hidden");
  }
  
}

document.addEventListener("DOMContentLoaded", loadContent);
