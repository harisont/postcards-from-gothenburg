var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

function addPhotos(places) {
  var baseUrl = "raw.githubusercontent.com/harisont/postcards-from-gothenburg/master/photos/"
  places.forEach(place => {
    var side = "a"
    var imgUrl = baseUrl + place + "/" + side + ".jpg"
    alert(imgUrl)
  });
}

function main() {
  // these are directory names and need to be kept updated. They are here to
  // iterate through images because "good" old js doesn't have access to the
  // filesystem... apparently
  var places = [
    //"alvborgsbron",
    //"gamlestadens_resecentrum_och_varldslitteraturhus",
    //"johanneberg_science_park",
    //"lyktan",
    //"chalmers_bibliotek",
    //"garda_fabriker",
    //"kuggen",
    //"molndalsfallen",
    //"eriksberg",
    //"gotaverkens_kranar",
    //"kvibergs_kasermer",
    //"radisson_blu",
    //"gamlestadens_cykelparkering",
    //"gothia_towers",
    //"lindholmen_science_park",
    //"sveriges_radio",
    //"gamlestadens_fabriker",
    "hisingsbron"//,
    //"lindholmens_tekniska_gymnasium"
  ]
  addPhotos(places);
  currentSlide(1);
}