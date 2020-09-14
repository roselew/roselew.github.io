import "../sass/main.scss";

import "es6-promise/auto";
import $ from "domtastic";
// import getUsersHTML from "./Users";

let container = $(".container"),
    button = $(".button");

button.on("click", function () {
    import("./Users").then(function ({ default: getUsersHTML }) {
        getUsersHTML().then((html) => {
            container.append(html);
        });
    });
});

$("[data-js-expand-toggle]").forEach((expand) => {
    $(expand).on("click", (e) => {
        const el = $(e.target);
        const modalContent = $(e.target).find("[data-js-expand-content");
        const modal = $("[data-js-expand-goal");
        const closeBtn = modalContent.find("[data-js-expand-close");
        modal.append(modalContent);
        modal.addClass("is-visible");
        modal.on("click", (e) => {
            if ($(e.target).hasClass("is-visible")) {
                modal.removeClass("is-visible");
                el.append(modalContent);
            }
        });
        closeBtn.on("click", () => {
            modal.removeClass("is-visible");
            el.append(modalContent);
        });
    });
});

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return (
        (rect.top + rect.height >= 0 && rect.top < windowHeight) ||
        (rect.bottom >= 0 && rect.bottom < windowHeight)
    );
}

$(window).on("scroll", () => {
    $("[data-js-view]").forEach((el) => {
        if (isElementInViewport(el)) {
            $(el).addClass("is-in-viewport");
        } else {
            $(el).removeClass("is-in-viewport");
        }
    });
});

$(document).ready(() => {
    $("[data-js-view]").forEach((el) => {
        if (isElementInViewport(el)) {
            $(el).addClass("is-in-viewport");
        } else {
            $(el).removeClass("is-in-viewport");
        }
    });
});

$("nav a").on("click", (e) => {
    e.preventDefault();

    const target = $(e.target.hash);

    window.scrollTo({
        top: target.get(0).offsetParent.offsetTop + target.get(0).offsetTop - 100,
        left: 0,
        behavior: "smooth",
    });

    const menu = $("[data-js-menu]");

    if (menu.hasClass("is-opened")) {
        menu.removeClass("is-opened");
    }
});

$("[data-js-menu-toggle]").on("click", () => {
    const menu = $("[data-js-menu]");
    menu.toggleClass("is-opened");
});

$(document).on("click", (e) => {
    const insideMenu = e.target.closest(".menu");
    const menu = $("[data-js-menu]");
    if (!insideMenu) {
        if (menu.hasClass("is-opened")) {
            menu.removeClass("is-opened");
        }
    }
});
