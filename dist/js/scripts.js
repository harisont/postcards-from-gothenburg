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

function flip(img) {
  if (img.src.endsWith("a.jpg")) {
    img.src = img.src.replace("a.jpg", "b.jpg");
  }
  else if (img.src.endsWith("b.jpg")) {
    img.src = img.src.replace("b.jpg", "c.jpg");
  }
  else if (img.src.endsWith("c.jpg")) {
    img.src = img.src.replace("c.jpg", "a.jpg");
  }
  else {
    console.log("invalid image url");
  }
}

function addPhotos(places) {
  var baseUrl = "photos/";
  places.forEach(function callback(place, n) {
    var side = "a";
    var imgUrl = baseUrl + place + "/" + side + ".jpg";
    
    // add big postcard
    var aSideImg = document.createElement("img");
    aSideImg.src = imgUrl;
    aSideImg.className = "side";
    aSideImg.onclick = function() {flip(aSideImg)}
    var postcard = document.createElement("div");
    postcard.className = "mySlides";
    postcard.appendChild(aSideImg);
    document.getElementById("gallery").appendChild(postcard); 

    // add thumbnail
    var thumbImg = document.createElement("img");
    thumbImg.src = imgUrl;
    thumbImg.className = "demo cursor thumb";
    thumbImg.onclick = function() {currentSlide(n + 1)}; // god knows why functions need be wrapped in functions
    var thumbnail = document.createElement("div");
    thumbnail.className = "column";
    thumbnail.appendChild(thumbImg);
    document.getElementById("previews").appendChild(thumbnail); 
  });
}

function main() {
  // these are directory names and need to be kept updated. They are here to
  // iterate through images because "good" old js doesn't have access to the
  // filesystem... apparently
  var places = [
    "alvborgsbron",
    //"gamlestadens_resecentrum_och_varldslitteraturhus",
    //"johanneberg_science_park",
    "lyktan",
    //"chalmers_bibliotek",
    //"garda_fabriker",
    "kuggen",
    "molndalsfallen",
    //"eriksberg",
    "gotaverkens_kranar",
    //"kvibergs_kasermer",
    //"radisson_blu",
    //"gamlestadens_cykelparkering",
    //"gothia_towers",
    "lindholmen_science_park",
    //"sveriges_radio",
    "gamlestadens_fabriker",
    "hisingsbron"//,
    //"lindholmens_tekniska_gymnasium"
  ];
  addPhotos(places);
  currentSlide(1);
}