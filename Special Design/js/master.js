// Toggle Spin the Gear
document.querySelector('.toggle-settings .fa-cog').onclick = function () {
    this.classList.toggle('fa-spin');
    document.querySelector('.setting-box').classList.toggle("open");
};

let mainColors = localStorage.getItem('color_option');
if (mainColors !== null) {
    // console.log('Local Storage is not empty you can set it on root')
    // console.log(localStorage.getItem("color_option"));
    document.documentElement.style.setProperty('--main-color', mainColors);
    document.querySelectorAll(".colors-list li").forEach(element => {
        // Remove active class from all elements
        element.classList.remove("active");
        
        if (element.dataset.color === mainColors) {
            // Add active class to the clicked color
            element.classList.add("active");
        };
    });
};

// Switch Colors
colorsLi = document.querySelectorAll(".colors-list li");
// Loop on All list Colors
colorsLi.forEach(li => {
    li.addEventListener("click", (e) => {
        // Set Color on Root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        // Set Color on local Storage
        localStorage.setItem('color_option', e.target.dataset.color);
        
        handleActive(e);
    })
});


// Select landing page element
let landingPage = document.querySelector('.Landing-Page');
let backGroundOption = true;
let backGroundInterval;
let backGroundStorage = localStorage.getItem('background_option');
if (backGroundStorage !== null) {

    if (backGroundStorage === 'true') {
        backGroundOption = true;
    } 
    else {
        backGroundOption = false;
    }
    console.log(backGroundStorage);
    
    // Remove Active class from all spans
    document.querySelectorAll(".random-back span").forEach(element => {
        element.classList.remove("active");
    });

    if (backGroundStorage === 'true') {
        document.querySelector(".random-back .yes").classList.add("active");
    } else {
        document.querySelector(".random-back .no").classList.add("active");
    }

};
// Get Array of images
let imgsArray = ["01.jpg","02.jpg","03.jpg","04.jpeg","05.jpg","06.jpg","07.jpg","08.jpg","09.jpg","10.jpg"]
function randomizeImages() {
    if (backGroundOption === true) {
        backGroundInterval = setInterval(() => {
            // Get random number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            //Change background images randomly
            landingPage.style.backgroundImage = 'url("./images/'+ imgsArray[randomNumber] +'")';
        }, 3000);
    }
};
randomizeImages();

// Switch Backgrounds Option 
const randomBackground = document.querySelectorAll(".random-back span");
// Loop on All spans
randomBackground.forEach(span => {
    span.addEventListener("click", (e) => {
        // Remove active class from the clicked target
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        })
        // Add class active to the clicked item
        e.target.classList.add("active");
        
        if (e.target.dataset.background === 'yes') {
            backGroundOption = true;
            randomizeImages();
            localStorage.setItem('background_option', true);
        } else {
            backGroundOption = false;
            clearInterval(backGroundInterval);
            localStorage.setItem('background_option', false);
        }
    })
});            

let pageScroll = document.querySelector('.skills');

window.onscroll = function () {
    let windowOffSet = pageScroll.offsetTop;
    let windowOffHeight = pageScroll.offsetHeight;
    let windowInnerHeight = this.innerHeight;
    let windowPageYset = this.pageYOffset;
    if (windowPageYset > (windowOffSet + windowOffHeight - windowInnerHeight)) {
        let skillsAnimation = document.querySelectorAll(".skills-box .skills-progress span");
        skillsAnimation.forEach(span => {
            span.style.width = span.dataset.progress;
        })
    };
};

let popup_overlay = document.querySelectorAll('.gallery .images-box img');

popup_overlay.forEach(img => {
    img.addEventListener('click', (e) => {
        
        // Create PopUp Overlay
        let overLay = document.createElement('div');
        // Add classname to the overlay
        overLay.className = 'popup-overlay';
        //Add the overlay to the body
        document.body.appendChild(overLay);
        // Add popup box in the overlay
        let popupBox = document.createElement('div');
        // Add a classname to the popup box
        popupBox.className = 'popup-box';

        if (img.alt != null) {
            let imageHeading = document.createElement('h3');
            let imageAlt = document.createTextNode(img.alt);
            // Put the Alt in the ImageHeading
            imageHeading.appendChild(imageAlt);
            // Put the imageHeading in the popupBox
            popupBox.appendChild(imageHeading);
        }

        // create the image in the popup box
        let popupImage = document.createElement('img');
        // Get a className to the popupImage
        popupImage.className = 'image';
        // Put the clicked image in the popupImage 
        popupImage.src = img.src;
        //  Put the image in the popup box
        popupBox.appendChild(popupImage);
        // Put the popupBox in the overLay
        overLay.appendChild(popupBox);

        // Create Close button
        let closeButton = document.createElement("span");
        
        // Add Text to the closeButton
        let closeText = document.createTextNode("X");
        closeButton.appendChild(closeText);

        // Add classname to the closeButton
        closeButton.className = 'close-button';

        // Put the closeButton in the popupBox
        popupBox.appendChild(closeButton);
    })
})

document.addEventListener('click', function (e) {
    if (e.target.className == 'close-button') {
        // First way to the remove the popup (Remove the popbox)
        e.target.parentNode.remove();
        // Second way to the remove the popup (Remove the overlay)
        document.querySelector('.popup-overlay').remove();
    }
});

// Handle Active State

function handleActive(ev) {
    // Remove Active class from all childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    // Add Active class on self
    ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {

        handleActive(e);
        if (span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block';
        } 
        else {
            bulletsContainer.style.display = 'none';
        }

    });
})

