$(function() {
  $('[data-toggle="tooltip"]').tooltip({ animated: "fade", placement: "auto", html: true });
});

document.getElementById("hamburger").onclick = () => {
  let hamburger = document.getElementById("hamburger");
  if (window.getComputedStyle(hamburger).display !== "none") {
    //only do this if hamburger is there

    for (let c of hamburger.children) {
      c.classList.toggle("rotate_hamburger_bar");
    }

    /*
    Following code to prevent triggering nav on resize
    (previously when only toggling visible, specifying no class would mean a disappear animation)
    if no class: nothing
    if visible: transition to make appear
    invisible: transition to dissapear, after 600ms go back to no class
    */
    let ul = document.querySelector("nav>ul");
    if (ul.classList.contains("mobile-nav-visible")) {
      ul.classList.remove("mobile-nav-visible");
      ul.classList.add("mobile-nav-invisible");
      setTimeout(() => ul.classList.remove("mobile-nav-invisible"), 600);
    } else {
      ul.classList.add("mobile-nav-visible");
    }
  }
};

function resizeHomepageText() {
  //Scale some elements on the page. Done by using formulas that originated from messing around ¯\_(ツ)_/¯
  let name_element = document.getElementById("name");
  let desc_element = document.getElementById("description");

  //get width, height, and aspect ratio
  let vw = window.innerWidth;
  let vh = window.innerHeight;
  let ratio = vw / vh;

  //set cutoff ratios for calculations
  ratio = ratio > 2.35 ? 2.35 : ratio;
  ratio = ratio < 1 / 2.35 ? 1 / 2.35 : ratio;

  //calculate fontsizes and apply to elements
  let fontSize = 0.08 * vh + 0.03 * vw + 10;
  fontSize = vw < 230 || vw * vh < 800 ? 24 : fontSize;

  name_element.style.fontSize = fontSize + "px";
  name_element.style.lineHeight = 0.9 * fontSize + "px";
  desc_element.style.fontSize = 0.25 * fontSize + "px";

  //calculate bottom "margin" and apply to elements
  let bottom = (1.8 / ratio + 0.9) * fontSize;
  bottom = vw < 230 ? (1 / 2) * vh : bottom;
  name_element.style.bottom = bottom + "px";
  desc_element.style.bottom =
    vw < 230 ? bottom - 1.1 * fontSize + "px" : bottom - 0.6 * fontSize + "px";

  //Show the elements once calculated
  name_element.style.visibility = "visible";
  desc_element.style.visibility = "visible";
}

function onLoadOrResize() {
  /*HOME*/
  if (document.location.pathname in { "/index.html": 0, "/index": 0, "/": 0 }) {
    resizeHomepageText();
  } else if (document.location.pathname in { "/about.html": 0, "/about": 0 }) {
    /*ABOUT*/
    //resize profile pic height
    let pic = document.getElementById("profile-pic");
    let about_me_text = document.getElementById("about-me-text");
    pic.style.height = window.getComputedStyle(about_me_text).height;
  } else if (document.location.pathname in { "/contact.html": 0, "/contact": 0 }) {
    /*CONTACT*/
    clickableArticlesContactPage();
  }
}

window.addEventListener("DOMContentLoaded", onLoadOrResize);
window.onresize = onLoadOrResize;

//Age changer

if (document.location.pathname in { "/about.html": 0, "/about": 0 }) {
  let dob = new Date("June 2, 1998 00:00:00");
  let age = Date.now() - dob;
  age = new Date(age);
  age = age.getFullYear() - 1970;
  document.getElementById("age").innerHTML = age;
}

function clickableArticlesContactPage() {
  let [messenger, linkedin, twitter] = document.querySelectorAll("article.social-card");
  messenger.onclick = () => window.open("https://m.me/DanteDeRuwe", "_blank");
  linkedin.onclick = () => window.open("https://linkedin.com/in/dantederuwe", "_blank");
  twitter.onclick = () => window.open("https://twitter.com/DanteDeRuwe", "_blank");

  //make sure twitter cta works properly, as it differs from the rest
  let twitterCta = twitter.querySelector(".cta");
  twitterCta.onclick = () => window.open(twitterCta.children[0].href, "_blank");
}
