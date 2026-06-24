/*
==========================================
AOS
==========================================
*/

if (typeof AOS !== "undefined") {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}

/*
==========================================
SWIPER
==========================================
*/

if (typeof Swiper !== "undefined") {

    new Swiper(".weddingSwiper", {

        loop: true,

        speed: 1000,

        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },

        slidesPerView: 1,

        spaceBetween: 20,

        breakpoints: {

            768: {
                slidesPerView: 1
            },

            1200: {
                slidesPerView: 1
            }

        }

    });

}

/*
==========================================
ТАЙМЕР
==========================================
*/

const weddingDate = new Date(
    2026,
    8,
    5,
    17,
    0,
    0
).getTime();

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

function updateCountdown() {

    const now = Date.now();

    const distance = weddingDate - now;

    if (distance < 0) {

        document.getElementById("countdown").innerHTML =
            "❤️ Сегодня наша свадьба ❤️";

        return;
    }

    const days =
        Math.floor(distance / 86400000);

    const hours =
        Math.floor(
            (distance % 86400000)
            / 3600000
        );

    const minutes =
        Math.floor(
            (distance % 3600000)
            / 60000
        );

    const seconds =
        Math.floor(
            (distance % 60000)
            / 1000
        );

    document.getElementById("days").textContent =
        String(days);

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}

updateCountdown();

setInterval(updateCountdown, 1000);

updateCountdown();

setInterval(updateCountdown, 1000);

/*
==========================================
ПЛАВНАЯ ПРОКРУТКА
==========================================
*/

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target =
                document.querySelector(
                    this.getAttribute("href")
                );

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

/*
==========================================
МУЗЫКА
==========================================
*/

const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

let isPlaying = false;

document.addEventListener("pointerdown", async () => {

    if (!isPlaying) {

        try {

            bgMusic.muted = false;
            await bgMusic.play();

            musicBtn.innerHTML = "❚❚";
            isPlaying = true;

        } catch (e) {

            console.error(e);

        }

    }

}, { once: true });

musicBtn.addEventListener("click", () => {

    if (bgMusic.paused) {

        bgMusic.play();
        musicBtn.innerHTML = "❚❚";

    } else {

        bgMusic.pause();
        musicBtn.innerHTML = "♪";

    }

});



/*
==========================================
RSVP
==========================================
*/

const form = document.getElementById("rsvpForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const result = document.getElementById("result");
        const button = form.querySelector("button");

        button.disabled = true;
        button.innerText = "Отправка...";

        try {

            const formData = new FormData(form);

            const data = {
                fullname: formData.get("fullname"),
                attendance: formData.get("attendance")
            };

            const response = await fetch("/api/rsvp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const json = await response.json();

            result.classList.remove("d-none", "alert-danger");
            result.classList.add("alert-success");
            result.innerHTML = json.message;

            form.reset();

        } catch (err) {

            result.classList.remove("d-none", "alert-success");
            result.classList.add("alert-danger");
            result.innerHTML = "Ошибка отправки";

        } finally {

            button.disabled = false;
            button.innerText = "Отправить ответ";

        }

    });

}

/*
==========================================
ПАРАЛЛАКС HERO
==========================================
*/

window.addEventListener("scroll", () => {

    const hero =
        document.querySelector(".hero");

    if (!hero) return;

    const offset =
        window.pageYOffset;

    hero.style.backgroundPositionY =
        offset * 0.5 + "px";

});

/*
==========================================
ЛЕПЕСТКИ
==========================================
*/

function createPetal() {

    const petal =
        document.createElement("div");

    petal.innerHTML = "❀";

    petal.style.position = "fixed";
    petal.style.top = "-30px";

    petal.style.left =
        Math.random() * 100 + "vw";

    petal.style.fontSize =
        Math.random() * 15 + 15 + "px";

    petal.style.opacity = "0.4";

    petal.style.pointerEvents = "none";

    petal.style.zIndex = "999";

    petal.style.transition =
        "transform 10s linear";

    document.body.appendChild(petal);

    setTimeout(() => {

        petal.style.transform =
            `translateY(${window.innerHeight + 200}px)
             rotate(${Math.random() * 720}deg)`;

    }, 50);

    setTimeout(() => {

        petal.remove();

    }, 10000);

}

setInterval(createPetal, 2500);

document.getElementById('openInvitation')
    .addEventListener('click', async () => {

        await bgMusic.play();

        document.getElementById('intro').remove();

    });

