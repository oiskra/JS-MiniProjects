const slides = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
const prevButton = document.querySelector('#prevBtn');
const nextButton = document.querySelector('#nextBtn');

const images = [
    'http://picsum.photos/seed/picsum/600/400',
    'http://picsum.photos/seed/picsum/600/400',
    'http://picsum.photos/seed/picsum/600/400',
    'http://picsum.photos/seed/picsum/600/400',
    'http://picsum.photos/seed/picsum/600/400',
    'http://picsum.photos/seed/picsum/600/400'
];

const generateImages = () => {
    images.forEach(image => {
        const imgTag = document.createElement('img');
        imgTag.src = image
        slides.appendChild(imgTag)
        console.log(imgTag)
    })
}

prevButton.addEventListener('click', () => { 
    
})

nextButton.addEventListener('click', () => { 
    
})





generateImages();
