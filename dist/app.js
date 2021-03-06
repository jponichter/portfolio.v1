const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const top = document.querySelector("nav");
  const navLinks = document.querySelectorAll(".nav-links li");
  const burgerColor = document.querySelectorAll("line");

  function animateLinks() {
    const screen = window.matchMedia("(max-width: 768px)");
    navLinks.forEach((link, index) => {
      if (link.style.animation && screen.matches) {
        link.style.animation = "";
      } else if (screen.matches) {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 +
          0.7}s`;
      }
    });
  }

  //Toggle Nav
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    if (window.matchMedia("(max-width: 768px)").matches) {
      top.classList.toggle("nav-black");
    }
    burgerColor.forEach(index => {
      index.classList.toggle("burger-white");
    });
    animateLinks();
  });

  //Toggle while clicking on links
  function linkToggle() {
    navLinks.forEach((link, index) => {
      link.addEventListener("click", () => {
        nav.classList.toggle("nav-active");
        if (window.matchMedia("(max-width: 768px)").matches) {
          top.classList.toggle("nav-black");
        }
        burgerColor.forEach(index => {
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
  let targetSection = document.querySelector(target);
  let targetPosition = targetSection.getBoundingClientRect().top;
  let startingPosition = window.pageYOffset;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    let timeElapsed = currentTime - startTime;
    let run = ease(timeElapsed, startingPosition, targetPosition, duration);
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
  const nav = document.querySelector("nav");
  const burger = document.querySelectorAll("line");
  const aboutPage = document.querySelector("#about-page");
  const portfolioPage = document.querySelector("#portfolio-page");
  const frontPage = document.querySelector(".front-page");
  const footer = document.querySelector("footer");

  const ScrollOneOptions = {
    rootMargin: "-100px 0px 0px 0px"
  };
  const ScrollTwoOptions = {
    threshold: 0,
    rootMargin: "-30px 0px 0px 0px"
  };
  const ScrollThreeOptions = {
    threshold: 0,
    rootMargin: "-30px 0px 0px 0px"
  };

  const ScrollOneObserver = new IntersectionObserver(
    (entries, ScrollOneObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          nav.classList.add("nav-scrolled");
        } else {
          nav.classList.remove("nav-scrolled");
        }
      });
    },
    ScrollOneOptions
  );

  const ScrollTwoObserver = new IntersectionObserver(
    (entries, ScrollTwoObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          burger.forEach((item, index) => {
            item.classList.add("burger-scrolled");
          });
        } else {
          burger.forEach((item, index) => {
            item.classList.remove("burger-scrolled");
          });
        }
      });
    },
    ScrollTwoOptions
  );

  const ScrollThreeObserver = new IntersectionObserver(
    (entries, ScrollThreeObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          burger.forEach((item, index) => {
            item.classList.remove("burger-scrolled");
          });
        } else {
          burger.forEach((item, index) => {
            item.classList.add("burger-scrolled");
          });
        }
      });
    },
    ScrollThreeOptions
  );

  ScrollOneObserver.observe(frontPage);
  ScrollTwoObserver.observe(aboutPage);
  ScrollThreeObserver.observe(portfolioPage);
}

navScroller();
