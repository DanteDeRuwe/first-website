function hamburgerClicked(hamburger) {
  for (child of hamburger.children) {
    child.classList.toggle("rotate_hamburger_bar");
  }
}

function resizeText(urlbaroffset) {
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
  let fontSize = 0.09 * vh + 0.03 * vw + 10;
  fontSize = vw < 230 || vw * vh < 800 ? 24 : fontSize;

  name_element.style.fontSize = fontSize + "px";
  name_element.style.lineHeight = 0.9 * fontSize + "px";
  desc_element.style.fontSize = 0.25 * fontSize + "px";

  //calculate bottom "margin" and apply to elements
  let bottom = (1.8 / ratio + 0.9) * fontSize;
  bottom = vw < 230 ? (1 / 2) * vh : bottom;
  bottom -= urlbaroffset; //mobile -_-
  name_element.style.bottom = bottom + "px";
  desc_element.style.bottom = bottom - 0.6 * fontSize + "px";

  //Show the elements once calculated
  name_element.style.visibility = "visible";
  desc_element.style.visibility = "visible";
}

function onLoadOrResize() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //urlbar support
    resizeText(56);
  } else {
    resizeText(0);
  }
}

window.onload = onLoadOrResize;
window.onresize = onLoadOrResize;
