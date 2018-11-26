function hamburgerClicked(hamburger) {
  for (child of hamburger.children) {
    child.classList.toggle("rotate_hamburger_bar");
  }
}

function onLoadorResize() {
  //Scale some elements on the page. Done by using formulas that originated from messing around ¯\_(ツ)_/¯
  let name_element = document.getElementById("name");

  let vw = window.innerWidth;
  let vh = window.innerHeight;

  let fontSize = 0.1 * vh + 0.033 * vw + 12;
  fontSize = vw < 230 ? 50 : fontSize;

  name_element.style.fontSize = fontSize + "px";
  name_element.style.lineHeight = 0.9 * fontSize + "px";

  let ratio = vw / vh;

  //set cutoff ratios
  ratio = ratio > 2.35 ? 2.35 : ratio;
  ratio = ratio < 1 / 2.35 ? 1 / 2.35 : ratio;

  let bottom = (1.2 / ratio + 1.3) * fontSize;
  bottom = vw < 230 ? (1 / 2) * vh : bottom;
  name_element.style.bottom = bottom + "px";

  name_element.style.visibility = "visible";

  let desc_element = document.getElementById("description");
  desc_element.style.bottom = bottom - 0.6 * fontSize + "px";
  desc_element.style.fontSize = 0.25 * fontSize + "px";
  desc_element.style.visibility = "visible";
}

window.onload = onLoadorResize;
window.onresize = onLoadorResize;
