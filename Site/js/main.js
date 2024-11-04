//Carousel slider
var currentSlide;
var positionChange;
var slides;
var dots;
var hamMenu;

var menuOn = false;

function init(){
    currentSlide = 1;
    positionChange = 100.325;
    slides = Array.from(document.getElementsByClassName("carousel-element"));
    dots = Array.from(document.getElementsByClassName("slider-dot"));
    hamMenu = document.getElementById("hamburger-overlay");

    document.getElementById("nextslide").addEventListener("click", function () {
        currentSlide++;
        if (currentSlide > slides.length) {
            currentSlide = 1;
        }
        var position = positionChange * (currentSlide - 1);
        ChangeSlide(currentSlide, position);
    });
    document.getElementById("prevslide").addEventListener("click", function () {
        currentSlide--;
        if (currentSlide == 0) {
            currentSlide = slides.length;
        }
        var position = positionChange * (currentSlide - 1);
        ChangeSlide(currentSlide, position);
    });

    dots.forEach((dot, index) => dot.addEventListener("click", function () {
            var position = positionChange * (index);
            ChangeSlide(index + 1, position);
        })
    );
}

function ChangeSlide(n, p) {
    var i;
    for (i = 0; i < slides.length; i++) {
        slides[i].setAttribute("style", "transform: translateX(-" + p + "%); z-index: 1; color: transparent; transition: color 1s ease 0s;");
    }
    slides[n - 1].setAttribute("style", "transform: translateX(-" + p + "%); z-index: 2; color: #fff; transition: color 1s ease 0s;");
    ChangeDot(n);
}

function ChangeDot(n) {
    var i;
    for (i = 0; i < slides.length; i++) {
        dots[i].classList.remove("active");
    }
    dots[n - 1].classList.add("active");
}

function ToggleHamburger() {
    menuOn = !menuOn;
    if(menuOn) {
        hamMenu.classList.add("active");
    }
    else {
        hamMenu.classList.remove("active");
    }
}

function SendRDV() {
    var formEl = document.forms.rdvForm;
    var formData = new FormData(formEl);
    
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "username",
        Password : "password",
        To : 'them@website.com',
        From : "me@website.com",
        Subject : "Prise de rendez-vous pour " + formData.get('nom-chien'),
        Body : "Nom du chien :" + formData.get('nom-chien') + 
        "%0D%0AAge :" + formData.get('age') + 
        "%0D%0ASexe :" + formData.get('sexe-chien') + 
        "%0D%0ANom du propriétaire :" + formData.get('nom-proprio') +
        "%0D%0ATéléphone :" + formData.get('telephone') +
        "%0D%0AShampooing spécial :" + formData.get('shampooing-requis') +
        "%0D%0AParfum :" + formData.get('parfum') +
        "%0D%0AService :" + formData.get('service') +
        "%0D%0ACommentaires :" + formData.get('commentaires') + 
        "%0D%0ACourriel de réponse :" + formData.get('email')
    }).then(
      message => alert(message)
    );
}

function SendContact() {
    var formEl = document.forms.contactForm;
    var formData = new FormData(formEl);
    
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "username",
        Password : "password",
        To : 'them@website.com',
        From : "me@website.com",
        Subject : "Message ou question de " + formData.get('nom'),
        Body : formData.get('message') + "%0D%0ACourriel de réponse :" + formData.get('email')
    }).then(
      message => alert(message)
    );
}
