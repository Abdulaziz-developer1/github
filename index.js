document.addEventListener("DOMContentLoaded", function () {
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
});

// Get elements
const leftMenu = document.getElementById('page1');
const rightMenu = document.getElementById('page2');
const backdrop = document.querySelector('.backdrop');
const openLeftBtn = document.querySelector('.open-page1');
const openRightBtn = document.querySelector('.open-page2');
const closeBtns = document.querySelectorAll('.fa-xmark');

// Toggle menu function
function toggleMenu(menu) {
  const otherMenu = menu === leftMenu ? rightMenu : leftMenu;
  
  // Close the other menu if open
  if (!otherMenu.classList.contains('hidden')) {
    otherMenu.classList.add('hidden');
  }
  
  // Toggle current menu
  menu.classList.toggle('hidden');
  
  // Toggle backdrop and body class
  if (!leftMenu.classList.contains('hidden') || !rightMenu.classList.contains('hidden')) {
    backdrop.classList.remove('hidden');
    document.body.classList.add('menu-open');
  } else {
    backdrop.classList.add('hidden');
    document.body.classList.remove('menu-open');
  }
}

// Event listeners
openLeftBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleMenu(leftMenu);
});

openRightBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleMenu(rightMenu);
});

backdrop.addEventListener('click', () => {
  leftMenu.classList.add('hidden');
  rightMenu.classList.add('hidden');
  backdrop.classList.add('hidden');
  document.body.classList.remove('menu-open');
});

closeBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const menu = e.target.closest('.page');
    menu.classList.add('hidden');
    
    if (leftMenu.classList.contains('hidden') && rightMenu.classList.contains('hidden')) {
      backdrop.classList.add('hidden');
      document.body.classList.remove('menu-open');
    }
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!leftMenu.contains(e.target) && !rightMenu.contains(e.target) && 
      !openLeftBtn.contains(e.target) && !openRightBtn.contains(e.target)) {
    leftMenu.classList.add('hidden');
    rightMenu.classList.add('hidden');
    backdrop.classList.add('hidden');
    document.body.classList.remove('menu-open');
  }
});