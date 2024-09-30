import { initializeSidebar, 
  // setupScrollEffect
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
        document.querySelector("#main-navbar").classList.add("absolute")
        const quoteBtn = document.querySelector(".quoetebtn");
        if (quoteBtn) {
          quoteBtn.classList.replace("bg-[#7432FF]", "bg-[#1D233A]");
        }

        // Initialize sidebar and dropdowns
        initializeSidebar();

        // Set up dropdowns for the main navbar

        // setupScrollEffect();
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
            section.querySelector("h2").innerHTML = `Home <span><img src="/assets/images/arrow_svg.svg" class="w-4 md:w-5" /></span> Services Details`;
          } else {
            section.querySelector("h1").innerText = "Services";
            section.querySelector("h2").innerHTML = `Home <span><img src="/assets/images/arrow_svg.svg" class="w-4 md:w-5" /></span> Services`;
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
