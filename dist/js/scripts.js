var showTutorial = true
var slideIndex = 1
var currLang = "Svenska"
var langs = ["Svenska", "English", "Italiano"]

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
]

// UI strings
const instructions = {
  Svenska: "Hej Göteborgare! " 
         + "Känner du inte igen den här platsen? " 
         + "Klicka på bilden för att få lite information. "
         + "Du kan också klicka igen för att se ett mer lätt "
         + "igenkännligt fotografi som tagits på samma plats.",
  English: "Hi! Don't you recognize this place? "
         + "Click on the picture to get some info. "
         + "You can even click again to se an easier-to-recognize picture "
         + "of the same landmark",
  Italiano: "Non (ri)conosci questo posto? "
          + "Clicca sulla foto per avere qualche informazione. "
          + "Cliccando due volte ti sarà mostrata una fotografia dello "
          + "stesso luogo dall'aspetto più familiare."
}

const projectName = {
  Svenska: "Vykort från Göteborg",
  English: "Postcards from Gothenburg",
  Italiano: "Cartoline da Göteborg"
}

const about = {
  Svenska: "Om projektet",
  English: "About the project",
  Italiano: "Il progetto"
}

function plusSlides(n) {
  showSlides(slideIndex += n)
}

function currentSlide(n) {
  showSlides(slideIndex = n)
}

function showSlides(n) {
  var i
  var slides = document.getElementsByClassName("mySlides")
  var dots = document.getElementsByClassName("demo")
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "")
  }
  slides[slideIndex-1].style.display = "block"
  dots[slideIndex-1].className += " active"
}

function hideSlides() {
  var i
  var slides = document.querySelectorAll(".mySlides")
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"
  }
}

function flip(img) {
  if (img.src.endsWith("/a.jpg")) {
    img.src = img.src.replace("/a.jpg", "/b" + currLang + ".jpg")
  }
  else if (img.src.endsWith("/bSvenska.jpg")) {
    img.src = img.src.replace("/bSvenska.jpg", "/c.jpg")
  }
  else if (img.src.endsWith("/bEnglish.jpg")) {
    img.src = img.src.replace("/bEnglish.jpg", "/c.jpg")
  }
  else if (img.src.endsWith("/bItaliano.jpg")) {
    img.src = img.src.replace("/bItaliano.jpg", "/c.jpg")
  }
  else if (img.src.endsWith("/c.jpg")) {
    img.src = img.src.replace("/c.jpg", "/a.jpg")
  }
  else {
    console.log("invalid image url")
  }
}

function activateArrows() {
  arrows = document.querySelectorAll(".prev,.next")
  arrows.forEach(function(arrow) {
    arrow.style.visibility = "visible"
  })
}

function inactivateArrows() {
  arrows = document.querySelectorAll(".prev,.next")
  arrows.forEach(function(arrow) {
    arrow.style.visibility = "hidden"
  })
}

function hidePreviews() {
  document.querySelectorAll(".row").forEach(function(row) {
    row.style.display = "none"
  })
}

function showPreviews() {
  document.querySelectorAll(".row").forEach(function(row) {
    row.style.display = "table"
  })
}

function tutorial() {
  if (showTutorial)
    confirm(instructions[currLang])
  showTutorial = false
}

function addPhotos(places) {
  var baseUrl = "photos/"
  places.forEach(function callback(place, n) {
    var side = "a"
    var imgUrl = baseUrl + place + "/" + side + ".jpg"
    
    // add big postcard
    var aSideImg = document.createElement("img")
    aSideImg.src = imgUrl
    aSideImg.className = "side"
    aSideImg.onclick = function() {flip(aSideImg)}
    var postcard = document.createElement("div")
    postcard.className = "mySlides"
    postcard.appendChild(aSideImg)
    document.getElementById("gallery").appendChild(postcard) 

    // add thumbnail
    var thumbImg = document.createElement("img")
    var thumbUrl = baseUrl + place + "/thumb.jpg"
    thumbImg.src = thumbUrl
    thumbImg.className = "demo cursor thumb"
    thumbImg.onclick = function() { // god knows why functions need be wrapped in functions
      activateArrows()
      hidePreviews()
      currentSlide(n + 1)
      tutorial()
    } 
    var thumbnail = document.createElement("div")
    thumbnail.className = "column"
    thumbnail.appendChild(thumbImg)
    if (n < 5) document.getElementById("previews1").appendChild(thumbnail) 
    else if (n >=5 && n < 10) document.getElementById("previews2").appendChild(thumbnail)
    else document.getElementById("previews3").appendChild(thumbnail)
  })
}

function setOnClickHomeLink(){
  document.getElementById("homelink").onclick = function() {
    inactivateArrows()
    showPreviews()
    hideSlides()
  }
}

function setMenuText() {
  document.getElementById("homelink").innerHTML = projectName[currLang]
  document.getElementById("aboutlink").innerHTML = about[currLang]
}

function setLangLinks(){
  var i
  var langlinks = document.querySelectorAll(".lang")
  var otherlangs = langs.filter(function(lang) {return lang != currLang})
  for (i = 0; i < langlinks.length; i++) {
    var newLang = otherlangs[i]
    langlinks[i].href = "#" + newLang
    langlinks[i].innerHTML = newLang
    langlinks[i].onclick = function() {
      var newLang = this.innerHTML
      currLang = newLang
      document.getElementById("aboutlink").href = "about" + newLang + ".html"
      document.querySelectorAll(".side").forEach(function(img) {
        if (img.src.endsWith("/bSvenska.jpg")) {
          img.src = img.src.replace("/bSvenska.jpg", "/b" + currLang + ".jpg")
        }
        else if (img.src.endsWith("/bEnglish.jpg")) {
          img.src = img.src.replace("/bEnglish.jpg", "/b" + currLang + ".jpg")
        }
        else if (img.src.endsWith("/bItaliano.jpg")) {
          img.src = img.src.replace("/bItaliano.jpg", "/b" + currLang + ".jpg")
        }
      })
      setMenuText()
      setLangLinks()
    }
  }
}

function setAboutLink(){
  document.getElementById("aboutlink").href = "about" + currLang + ".html"
}

function main() {
  var currUrl = window.location.href
  currLang = currUrl.split("#")[1]
  if (currLang == null || currLang == "") currLang = "Svenska"
  addPhotos(places)
  setOnClickHomeLink()
  setLangLinks()
  setAboutLink()
  setMenuText()
}