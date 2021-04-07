const fadein = document.querySelectorAll(".fade-in");
const line = document.getElementById("line");
const sliders = document.getElementById("double-image");
const gridSlider = document.getElementById("image-grid");
const gallery = document.getElementById("image-section");

const appearOptions = {
    threshold: 0.45,
};

const blankOptions = {
};

const gridOptions ={
    threshold: 0,
    rootMargin: '400px',
}

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

// about us image slide in
const imageObserver = new IntersectionObserver
(function (entries, observer){
    entries.forEach(entry => {
        if(!entry.isIntersecting) return ;
        entry.target.classList.add("image-appear");
        observer.unobserve(entry.target);
    })
}, blankOptions);

// grid image slide in
const gridObserve = new IntersectionObserver
(function (entries, observer){
    entries.forEach(entry => {
        if(!entry.isIntersecting) return ;
        entry.target.classList.add("image-appear-grid");
        observer.unobserve(entry.target);
    })
}, gridOptions);

fadein.forEach(fader => {
    appearObserver.observe(fader);
})

// Image Gallergy 
function appearImageGallery (){
    if (gallery.classList.contains("reveal-image-section")){
        gallery.classList.remove("reveal-image-section");
    } else {
        gallery.classList.add("reveal-image-section");
    }
}

lineObserver.observe(line);
imageObserver.observe(sliders);
gridObserve.observe(gridSlider);

