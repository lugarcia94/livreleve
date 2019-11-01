import './style.styl';
import 'slick-carousel';
import 'slick-carousel/slick/slick.css';

$('body').addClass('blackfriday__on');

setTimeout(function(){
$('.section__blackfriday .banners__slick').slick({
    infinite: false,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }
    ]
});


// Set the date we're counting down to
var countDownDate = new Date("11/28/2019 23:59").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("demo").innerHTML = "<strong class='dias'> " + days + " : </strong><strong class='horas'>" + hours + " : </strong><strong class='minutos'>"
  + minutes + "</strong>" + "<span class='segundos'> : " + seconds + "</span>";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRADO";
  }
}, 1000);

}, 1000);
 
let name = window.location.pathname; 
if(name === '/sala-de-estar') {
    $('body').addClass('especial__category');
}
 
// plugin instagram
var instagramUserId = "2098271925"
var instagramToken = "2098271925.1677ed0.455773e8dec54cf8ba64ea3f97ca8c1b"

var galleryFeed = new Instafeed({
    get: "user",
    userId: instagramUserId,
    accessToken: instagramToken,
    resolution: "standard_resolution",
    useHttp: "true",
    limit: 6,
    links: "true",
    template: '<div class="img-featured-container instafeed__item">' +
        '<a href="{{link}}" class="instafeed__link" target="_blank">' +
        '<img src="{{image}}" class="instafeed__image img-responsive">' +
        '</a>' +
        '</div>',
    target: "instafeed-gallery-feed",
    after: function () {
        if (!this.hasNext()) {
            if (btnInstafeedLoad)
                btnInstafeedLoad.setAttribute('disabled', 'disabled');
        }
    }
});

if($('body.home').length) {
    galleryFeed.run();
}

 
 