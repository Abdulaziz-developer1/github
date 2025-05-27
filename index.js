document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.querySelector(".open-page1");
  const page1 = document.getElementById("page1");

  if (menuBtn && closeBtn && page1) {
    menuBtn.addEventListener("click", () => {
      page1.classList.remove("hidden");
    });
  }

  closeBtn.addEventListener("click", () => {
    page1.classList.add("hidden");
  });

  if (menuBtn && closeBtn && page1) {
    menuBtn.addEventListener("click", () => {
      page1.classList.remove("hidden");
    });

    closeBtn.addEventListener("click", () => {
      page1.classList.add("hidden");
    });
  }

  const savedFollowState = localStorage.getItem("githubProfileFollowState");
  const savedSponsorState = localStorage.getItem("githubProfileSponsorState");

  const followButton = document.getElementById("followButton");
  let isFollowing = savedFollowState === "true";

  if (isFollowing) {
    followButton.textContent = "Following";
    followButton.classList.add("following");
  }

  followButton.addEventListener("click", function () {
    isFollowing = !isFollowing;
    if (isFollowing) {
      this.textContent = "Following";
      this.classList.add("following");
    } else {
      this.textContent = "Follow";
      this.classList.remove("following");
    }
    localStorage.setItem("githubProfileFollowState", isFollowing.toString());
  });

  const sponsorButton = document.getElementById("sponsorButton");
  const sponsorText = document.getElementById("sponsorText");
  let isSponsoring = savedSponsorState === "true";

  if (isSponsoring) {
    sponsorText.textContent = "Sponsored";
  }

  sponsorButton.addEventListener("click", function () {
    isSponsoring = !isSponsoring;
    if (isSponsoring) {
      sponsorText.textContent = "Sponsored";
      alert("Thank you for sponsoring!");
    } else {
      sponsorText.textContent = "Sponsor";
    }
    localStorage.setItem("githubProfileSponsorState", isSponsoring.toString());
  });

  const yearButtons = document.querySelectorAll(".year-button");
  const contributionsYear = document.getElementById("contributionsYear");
  const contributionsImage = document.getElementById("contributionsImage");

  yearButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const year = this.getAttribute("data-year");
      contributionsYear.textContent = year;
      contributionsImage.src = `assets/${year}.png`;
      contributionsImage.alt = `${year} GitHub contributions`;

      yearButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });

  const currentYear = new Date().getFullYear().toString();
  document
    .querySelector(`.year-button[data-year="${currentYear}"]`)
    .classList.add("active");

  const dropdowns = document.querySelectorAll(
    ".header-dropdown, .profile-dropdown"
  );

  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", function (e) {
      e.stopPropagation();
      const menu = this.querySelector(".dropdown-content");
      if (menu) {
        menu.style.display = menu.style.display === "block" ? "none" : "block";
      }
    });
  });

  window.addEventListener("click", function () {
    document.querySelectorAll(".dropdown-content").forEach((menu) => {
      menu.style.display = "none";
    });
  });

  const tabs = document.querySelectorAll(".tab-button");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
    });
  });

  const openLeftBtn = document.getElementById("openLeftMenu"); // Reference the button
  const leftMenu = document.getElementById("page1"); // Reference the left menu
  const backdrop = document.querySelector(".backdrop"); // Reference the backdrop

  // Function to toggle the menu
  function toggleMenu(menu) {
    menu.classList.toggle("hidden");
    backdrop.classList.toggle("hidden");
    document.body.classList.toggle("menu-open");
  }

  // Event listener for opening the left menu
  openLeftBtn?.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent event bubbling
    toggleMenu(leftMenu);
  });

  // Event listener for closing the menu when clicking on the backdrop
  backdrop?.addEventListener("click", () => {
    leftMenu.classList.add("hidden");
    backdrop.classList.add("hidden");
    document.body.classList.remove("menu-open");
  });

  const rightMenu = document.getElementById("page2");
  const openRightBtn = document.querySelector(".open-page2");
  const closeBtns = document.querySelectorAll(".fa-xmark");

  // Event listeners for opening menus
  openRightBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu(rightMenu);
  });

  // Event listeners for close buttons
  closeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const menu = e.target.closest(".page");
      menu.classList.add("hidden");

      if (leftMenu.classList.contains("hidden") && rightMenu.classList.contains("hidden")) {
        backdrop.classList.add("hidden");
        document.body.classList.remove("menu-open");
      }
    });
  });

  // Close menus when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !leftMenu.contains(e.target) &&
      !rightMenu.contains(e.target) &&
      !openLeftBtn.contains(e.target) &&
      !openRightBtn.contains(e.target)
    ) {
      leftMenu.classList.add("hidden");
      rightMenu.classList.add("hidden");
      backdrop.classList.add("hidden");
      document.body.classList.remove("menu-open");
    }
  });
});
