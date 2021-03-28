const fadein = document.querySelectorAll(".fade-in");
const line = document.getElementById("line");
const sliders = document.getElementById("double-image");

const appearOptions = {
    threshold: 0.45,
};

const imageOptions = {
};

// text fade in
const appearObserver = new IntersectionObserver
    (function (entries, observer){
        entries.forEach(entry => {
            if(!entry.isIntersecting) return ;
            entry.target.classList.add("appear");
            observer.unobserve(entry.target);
        })
    }, appearOptions);

// span line fade in
const lineObserver = new IntersectionObserver
(function (entries, observer){
    entries.forEach(entry => {
        if(!entry.isIntersecting) return ;
        entry.target.classList.add("line-appear");
        observer.unobserve(entry.target);
    })
}, appearOptions);

// image fade in
const imageObserver = new IntersectionObserver
(function (entries, observer){
    entries.forEach(entry => {
        if(!entry.isIntersecting) return ;
        entry.target.classList.add("image-appear");
        observer.unobserve(entry.target);
    })
}, imageOptions);

fadein.forEach(fader => {
    appearObserver.observe(fader);
})

lineObserver.observe(line);
imageObserver.observe(sliders);

