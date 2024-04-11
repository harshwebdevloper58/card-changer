
console.log("Let's write some JavaScript!");

//console.log("This part is written by HARSH")
//code for a slider of a main page

const initSlider = () => {
    const cardlist = document.querySelector(".main-cards");
    const sliderbutton = document.querySelectorAll(".slide-button");
    const maxscroll = cardlist.scrollWidth - cardlist.clientWidth;

    sliderbutton.forEach((button) => {
        button.addEventListener("click", () => {
            console.log(button)
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollamount = cardlist.clientWidth * direction;
            cardlist.scrollBy({ left: scrollamount, behavior: "smooth" });
        });
    });
    //for second slider
    const cardlist2 = document.querySelector(".main-card2");
    const sliderbutton2 = document.querySelectorAll(".slide-button2");
    const maxscroll2 = cardlist2.scrollWidth - cardlist2.clientWidth;

    sliderbutton2.forEach((button) => {
        button.addEventListener("click", () => {
            console.log(button)
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollamount = cardlist2.clientWidth * direction;
            cardlist2.scrollBy({ left: scrollamount, behavior: "smooth" });
        });
    });
    //for third slider

    const cardlist3 = document.querySelector(".main-card3");
    const sliderbutton3 = document.querySelectorAll(".slide-button3");
    const maxscroll3 = cardlist3.scrollWidth - cardlist3.clientWidth;

    sliderbutton3.forEach((button) => {
        button.addEventListener("click", () => {
            console.log(button)
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollamount = cardlist3.clientWidth * direction;
            cardlist3.scrollBy({ left: scrollamount, behavior: "smooth" });
        });
    });
};
window.addEventListener("load", initSlider);

//animation onscroll

const stepsection = document.querySelectorAll(".steps .card");

const purchase = document.querySelector(".purchase-card");
const sell = document.querySelector(".sell-card");
//console.log(sell)
window.onscroll = () => {
    //this animation on a step function

    stepsection.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop; // Use offsetTop for individual element
        let height = sec.offsetHeight; // Use offsetHeight for individual element

        if (top >= offset && top <= offset + height) {
            sec.classList.add("card1");
        }
    });
    //this animation for a purches and sell btn

    let stepinfo = document.getElementsByClassName("steps")[0];
    let clientinfo = stepinfo.getBoundingClientRect();

    //console.log(clientinfo.top)
    //console.log(purchaseinfo.top)
    if (clientinfo.top <= 225 && clientinfo.top >= 0) {
        purchase.classList.add("pt2");
        sell.classList.add("pt2");
    }
    //animation on a faq heading
    let faqhead = document.getElementsByClassName("faqh1")[0];
    let faqinfo = faqhead.getBoundingClientRect();
    if (faqinfo.top <= 515 && faqinfo.top >= 0) {
        faqhead.classList.add("downfall")
    }


    let footerdetails = document.getElementsByClassName("footer")[0];
    let footerinfo = footerdetails.getBoundingClientRect();
    
    if (footerinfo.top <= 664 && footerinfo.top > 235) {
        footerdetails.classList.add("movetop");
    }

};

//this animation is for a anto card scroll
function checkAndScroll() {
    const cardlist = document.querySelector(".main-cards");
    let maincardinfo = cardlist.getBoundingClientRect();

    if (maincardinfo.top <= 266 && maincardinfo.top > 0) {
        cardlist.scrollBy({ left: 800, behavior: "smooth" });

        // Remove the event listener once the scroll action has been performed
        window.removeEventListener('scroll', checkAndScroll);
    }
}
window.addEventListener('scroll', checkAndScroll);


//this is for second main-cacrd2
function checkAndScroll2() {
    const cardlist = document.querySelector(".main-card2");
    let maincardinfo = cardlist.getBoundingClientRect();

    if (maincardinfo.top <= 266 && maincardinfo.top > 0) {
        cardlist.scrollBy({ left: 800, behavior: "smooth" });

        // Remove the event listener once the scroll action has been performed
        window.removeEventListener('scroll', checkAndScroll2);
    }
}

window.addEventListener('scroll', checkAndScroll2);

//this is for second main-cacrd3
function checkAndScroll3() {
    const cardlist = document.querySelector(".main-card3");
    let maincardinfo = cardlist.getBoundingClientRect();

    if (maincardinfo.top <= 266 && maincardinfo.top > 0) {
        cardlist.scrollBy({ left: 800, behavior: "smooth" });

        // Remove the event listener once the scroll action has been performed
        window.removeEventListener('scroll', checkAndScroll3);
    }
}

window.addEventListener('scroll', checkAndScroll3);