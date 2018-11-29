(function(){
    function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
    return (
        (rect.top + rect.height >= 0 && rect.top < windowHeight - 150) ||
        (rect.bottom >= 0 && rect.bottom < windowHeight)
    );
}

window.addEventListener("scroll", () => {
    document.querySelectorAll('[data-js-view]').forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add("is-in-viewport");
        } else {
            el.classList.remove("is-in-viewport");
        }
    });
});

window.addEventListener("load", () => {

    const words = document.querySelectorAll(".c-movie__title span");
    words.forEach((word,index)=>{
        setTimeout(()=>{word.classList.add('is-in-viewport')},index*200);
    })
    setTimeout(()=>{
        document.querySelector(".c-movie__play").classList.add('is-in-viewport');
        document.querySelector(".c-movie__run").classList.add('is-in-viewport');
    },words.length*200);
})

var iframe = document.querySelector('iframe');
var player = new Vimeo.Player(iframe);
var playButton = document.querySelector(".c-movie__intro");
playButton.addEventListener("click", function(e) {
    e.preventDefault();
    playButton.style.display = "none";
    player.play();
  });

})();