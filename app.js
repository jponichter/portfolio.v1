"use strict";

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

var navSlide = function navSlide() {
  var burger = document.querySelector(".burger");
  var nav = document.querySelector(".nav-links");
  var top = document.querySelector("nav");
  var navLinks = document.querySelectorAll(".nav-links li");
  var burgerColor = document.querySelectorAll("line");

  function animateLinks() {
    var screen = window.matchMedia("(max-width: 768px)");
    navLinks.forEach(function(link, index) {
      if (link.style.animation && screen.matches) {
        link.style.animation = "";
      } else if (screen.matches) {
        link.style.animation = "navLinkFade 0.5s ease forwards ".concat(
          index / 7 + 0.7,
          "s"
        );
      }
    });
  } //Toggle Nav

  burger.addEventListener("click", function() {
    nav.classList.toggle("nav-active");

    if (window.matchMedia("(max-width: 768px)").matches) {
      top.classList.toggle("nav-black");
    }

    burgerColor.forEach(function(index) {
      index.classList.toggle("burger-white");
    });
    animateLinks();
  }); //Toggle while clicking on links

  function linkToggle() {
    navLinks.forEach(function(link, index) {
      link.addEventListener("click", function() {
        nav.classList.toggle("nav-active");

        if (window.matchMedia("(max-width: 768px)").matches) {
          top.classList.toggle("nav-black");
        }

        burgerColor.forEach(function(index) {
          index.classList.remove("burger-white");
        });
        animateLinks();
      });
    });
  }

  linkToggle();
};

navSlide();

function smoothScroll(target, duration) {
  var targetSection = document.querySelector(target);
  var targetPosition = targetSection.getBoundingClientRect().top;
  var startingPosition = window.pageYOffset;
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed, startingPosition, targetPosition, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

document.querySelector(".link-about").addEventListener("click", function() {
  smoothScroll("#about-page", 1000);
});
document.querySelector(".link-portfolio").addEventListener("click", function() {
  smoothScroll("#portfolio-page", 1000);
});
document.querySelector(".link-contact").addEventListener("click", function() {
  smoothScroll("#contact-page", 1000);
});

function navScroller() {
  var nav = document.querySelector("nav");
  var burger = document.querySelectorAll("line");
  var aboutPage = document.querySelector("#about-page");
  var portfolioPage = document.querySelector("#portfolio-page");
  var frontPage = document.querySelector(".front-page");
  var footer = document.querySelector("footer");
  var ScrollOneOptions = {
    rootMargin: "-100px 0px 0px 0px"
  };
  var ScrollTwoOptions = {
    threshold: 0,
    rootMargin: "-30px 0px 0px 0px"
  };
  var ScrollThreeOptions = {
    threshold: 0,
    rootMargin: "-30px 0px 0px 0px"
  };
  var ScrollOneObserver = new IntersectionObserver(function(
    entries,
    ScrollOneObserver
  ) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) {
        nav.classList.add("nav-scrolled");
      } else {
        nav.classList.remove("nav-scrolled");
      }
    });
  },
  ScrollOneOptions);
  var ScrollTwoObserver = new IntersectionObserver(function(
    entries,
    ScrollTwoObserver
  ) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) {
        burger.forEach(function(item, index) {
          item.classList.add("burger-scrolled");
        });
      } else {
        burger.forEach(function(item, index) {
          item.classList.remove("burger-scrolled");
        });
      }
    });
  },
  ScrollTwoOptions);
  var ScrollThreeObserver = new IntersectionObserver(function(
    entries,
    ScrollThreeObserver
  ) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) {
        burger.forEach(function(item, index) {
          item.classList.remove("burger-scrolled");
        });
      } else {
        burger.forEach(function(item, index) {
          item.classList.add("burger-scrolled");
        });
      }
    });
  },
  ScrollThreeOptions);
  ScrollOneObserver.observe(frontPage);
  ScrollTwoObserver.observe(aboutPage);
  ScrollThreeObserver.observe(portfolioPage);
}

navScroller();
