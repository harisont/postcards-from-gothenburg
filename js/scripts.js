var showTutorial = true;
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

function activateArrows() {
  arrows = document.querySelectorAll(".prev,.next")
  arrows.forEach(function(arrow) {
    arrow.style.visibility = "visible";
  })
}

function hidePreviews() {
  document.querySelectorAll(".row").forEach(function(row) {
    row.style.display = "none"
  })
}

function tutorial() {
  if (showTutorial)
    confirm("Hej Göteborgare! " 
        + "Känner du inte igen den här platsen? " 
        + "Klicka på bilden för att få lite information. "
        + "Du kan också klicka igen för att se ett mer lätt "
        + "igenkännligt fotografi som tagits på samma plats."
        )
  showTutorial = false
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
    var thumbUrl = baseUrl + place + "/thumb.jpg";
    thumbImg.src = thumbUrl;
    thumbImg.className = "demo cursor thumb";
    thumbImg.onclick = function() { // god knows why functions need be wrapped in functions
      activateArrows();
      hidePreviews();
      currentSlide(n + 1);
      tutorial();
    }; 
    var thumbnail = document.createElement("div");
    thumbnail.className = "column";
    thumbnail.appendChild(thumbImg);
    if (n < 5) document.getElementById("previews1").appendChild(thumbnail); 
    else if (n >=5 && n < 10) document.getElementById("previews2").appendChild(thumbnail);
    else document.getElementById("previews3").appendChild(thumbnail);
  });
}

function main() {
  // these are directory names and need to be kept updated. They are here to
  // iterate through images because "good" old js doesn't have access to the
  // filesystem... apparently
  var places = [
    "alvborgsbron",
    "gamlestadens_resecentrum",
    "lyktan",
    "garda_fabriker",
    "kuggen",
    "molndalsfallen",
    "gotaverkens_kranar",
    "kvibergs_kasermer",
    "gamlestadens_cykelparkering",
    "gothia_towers",
    "lindholmen_science_park",
    "gamlestadens_fabriker",
    "hisingsbron",
    "johanneberg_science_park",
    "chalmers_bibliotek"
  ];
  addPhotos(places);
  //currentSlide(1);
}