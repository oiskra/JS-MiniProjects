const slides = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
const prevButton = document.querySelector('#prev-btn');
const nextButton = document.querySelector('#next-btn');

const startingTranslate = 0;
const endingTranslate = -3600;
let currentTranslate = 0;
let animationInterval;
let animation;
let dotCounter = 0;
const images = [
    'http://picsum.photos/id/199/600/400',
    'http://picsum.photos/id/201/600/400',
    'http://picsum.photos/id/102/600/400',
    'http://picsum.photos/id/132/600/400',
    'http://picsum.photos/id/123/600/400',
    'http://picsum.photos/id/312/600/400',
    'http://picsum.photos/id/199/600/400'
];


const generateImages = () => {
    images.forEach(image => {
        const imgTag = document.createElement('img');
        imgTag.src = image
        slides.appendChild(imgTag)
        console.log(imgTag.src)
    })
}

const toggleDots = () => {
    dots[dotCounter].classList.toggle("active");
    dotCounter++;
    if(dotCounter === dots.length) {dotCounter = 0;}
    dots[dotCounter].classList.toggle("active");
}
const toggleDotsReverse = () => {
    dots[dotCounter].classList.toggle("active");
    dotCounter--;
    if(dotCounter === 0) {dotCounter = dots.length;}
    dots[dotCounter].classList.toggle("active");
}

const sliderAnimation = () => {
    animationInterval = setInterval(() => {
        if(currentTranslate > endingTranslate) {
            animation = slides.animate([
                {transform: `translateX(${currentTranslate}px)`},
                {transform: `translateX(${currentTranslate-600}px)`}
            ], {
                duration: 2000,
                easing: 'ease-in-out',
                fill: 'forwards'
            });
            animation.commitStyles()
            currentTranslate -= 600;

            toggleDots();
        } else {
            clearInterval(animationInterval);
            slides.style.transform = `transformX(${startingTranslate}px)`;
            currentTranslate = 0;
            sliderAnimation();
        }
    }, 4000);

}

slides.addEventListener('mouseover', () => {
    clearInterval(animationInterval);
    console.log('mouseover')    
})

slides.addEventListener('mouseout', () => {
    sliderAnimation();
    console.log('mouseout')    
})

prevButton.addEventListener('click', () => { 
    console.log('dot:', dotCounter)
    if(currentTranslate >= startingTranslate) {
        slides.style.transform = `translateX(${-3000}px)`;
        currentTranslate = -3000;
    } else {
        slides.style.transform = `translateX(${currentTranslate + 600}px)`;
        animation.cancel();
        clearInterval(animationInterval);
        toggleDotsReverse();
        currentTranslate += 600;
    }
})

nextButton.addEventListener('click', () => { 
    console.log(currentTranslate)
    if(currentTranslate <= -3000) {
        slides.style.transform = `translateX(${startingTranslate}px)`;
        currentTranslate = startingTranslate;        
    } else{
        slides.style.transform = `translateX(${currentTranslate - 600}px)`;
        animation.cancel();
        clearInterval(animationInterval);
        toggleDots();
        currentTranslate -= 600;
    }
})

generateImages();
sliderAnimation();