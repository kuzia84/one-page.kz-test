@@include("ion.rangeSlider.js")

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

/* Custom range input*/
$(".js-range-slider").ionRangeSlider({
  skin: "modern",
  hide_min_max: true,
  hide_from_to: true,
  min: 0,
  max: 4,
  from: 2  
});
let my_range = $(".js-range-slider").data("ionRangeSlider");
const skillLinks = document.querySelectorAll(".description-js__item[data-skill]");
const skillLevels = {
   1: 0,
   2: 1,
   3: 2,
   4: 4
};
skillLinks.forEach(element => {
  element.addEventListener('click', function () {
    my_range.update({
      from: skillLevels[element.dataset.skill]
    });
  })
});

/* Custom select */
var x, i, j, l, ll, selElmnt, a, b, c, w;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  w = document.createElement('div');
  w.classList.add('select-items-wrapper');
  b.appendChild(w)
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    w.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

/* Top nav*/
const burger = document.querySelector(".burger-btn"),
  navList = document.querySelector(".nav-header__nav-container"),
  navLinks = document.querySelectorAll(".nav-list__link[data-goto]");

burger.addEventListener('click', handleBurger);

function handleBurger() {
  burger.classList.toggle("active");
  navList.classList.toggle("show");
}
navList.addEventListener('click', function(e) {
  setActive(e);
  if(e.target.classList.contains("nav-list__link")) closeNav()
});
function setActive(target) { 
  navLinks.forEach(function(element)  {
    element.classList.remove("active");
  });   
  target.target.classList.add("active");
}
function closeNav(){
  burger.classList.remove("active");
  navList.classList.remove("show");
}

/* Scroll to block*/
if (navLinks.length) {
  navLinks.forEach(function(navLink)  {
    navLink.addEventListener('click', onNavLickClick);
  });

  function onNavLickClick(e) {
    const navLink = e.target;
    if(navLink.dataset.goto && document.querySelector(navLink.dataset.goto)) {
      const gotoBlock = document.querySelector(navLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - 77;
      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}