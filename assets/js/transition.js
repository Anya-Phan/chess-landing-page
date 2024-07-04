const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btnLeft = $(".member__btn-left");
const btnRight = $(".member__btn-right");
const slides = $$(".member__slide");
const memberList = $(".member__list");

function nextItem(index, list) {
    const offSet = index * 100;
    list.style.transform = `translateX(${offSet * -1}%)`;
    console.log(list.style.transform);
}

const btnLeftStage = $(".stage__btn-left");
const btnRightStage = $(".stage__btn-right");
const stageList = $(".stage__grid");
const dotItems = $$(".stage__dot-item");

let stageIndex = 0;
btnRightStage.onclick = function () {
    stageIndex++;
    if (btnLeftStage.classList.contains("disable")) {
        btnLeftStage.classList.remove("disable");
    }
    if (stageIndex >= 4) {
        this.classList.add("disable");
    }
    nextItem(stageIndex, stageList);
    dotItems.forEach((item) => {
        if (item.classList.contains("active")) {
            item.classList.remove("active");
        }
    });
    dotItems[stageIndex].classList.add("active");
};
btnLeftStage.onclick = function () {
    stageIndex--;
    if (btnRightStage.classList.contains("disable")) {
        btnRightStage.classList.remove("disable");
    }
    if (stageIndex <= 0) {
        this.classList.add("disable");
    }
    nextItem(stageIndex, stageList);
    dotItems.forEach((item) => {
        if (item.classList.contains("active")) {
            item.classList.remove("active");
        }
    });
    dotItems[stageIndex].classList.add("active");
};

// Responsive member control
function resMemberControl(viewMobile) {
    if (viewMobile.matches) {
        btnLeft.classList.add("disable");
        btnRight.classList.remove("disable");
        slides.forEach((slide) => {
            slide.style.display = "flex";
        });
        let resIndex = 0;
        $(".member__pages span").innerText = "1";
        const memberSum = $$(".member__item").length;
        btnLeft.onclick = function () {
            if (btnRight.classList.contains("disable")) {
                btnRight.classList.remove("disable");
            }
            resIndex--;
            if (resIndex <= 0) {
                this.classList.add("disable");
            }
            $(".member__pages span").innerText = `${resIndex + 1}`;
            nextItem(resIndex, memberList);
        };
        btnRight.onclick = function () {
            if (btnLeft.classList.contains("disable")) {
                btnLeft.classList.remove("disable");
            }
            resIndex++;
            console.log(memberSum);
            if (resIndex >= memberSum - 1) {
                this.classList.add("disable");
            }
            $(".member__pages span").innerText = `${resIndex + 1}`;
            nextItem(resIndex, memberList);
        };
    } else {
        let currIndex = 0;
        memberList.style.transform = "translateX(0)";
        slides[currIndex].style.display = "flex";
        btnLeft.classList.add("disable");
        btnRight.classList.remove("disable");
        $(".member__pages span").innerText = "3";
        btnLeft.onclick = function () {
            slides.forEach((slide, index) => {
                if (slide.style.display === "flex") {
                    slide.style.display = "none";
                }
            });
            if (btnRight.classList.contains("disable")) {
                btnRight.classList.remove("disable");
            }
            currIndex--;
            slides[currIndex].style.display = "flex";
            if (currIndex <= 0) {
                this.classList.add("disable");
            }
            $(".member__pages span").innerText = `${(currIndex + 1) * 3}`;
        };

        btnRight.onclick = function () {
            slides.forEach((slide) => {
                if (slide.style.display === "flex") {
                    slide.style.display = "none";
                }
            });
            if (btnLeft.classList.contains("disable")) {
                btnLeft.classList.remove("disable");
            }
            currIndex++;
            if (currIndex >= slides.length - 1) {
                this.classList.add("disable");
            }
            slides[currIndex].style.display = "flex";
            $(".member__pages span").innerText = `${(currIndex + 1) * 3}`;
        };
    }
}
var viewMobile = window.matchMedia("(max-width: 740px)");
resMemberControl(viewMobile);
viewMobile.addEventListener("change", function () {
    resMemberControl(viewMobile);
});
