setTimeout(function(){ 

  window.onscroll = function() {fixed()};

  function fixed() {
    if (window.pageYOffset > document.querySelector(".header").offsetTop) {
      document.querySelector(".header").classList.add("sticky");
    } else {
      document.querySelector(".header").classList.remove("sticky");
    }
  }

 }, 2000);