import { getTodayDate } from './getTodayDate.js';
import { refreshPage } from './refreshPage.js';
import { activeTab } from './tab.js';
document.addEventListener('DOMContentLoaded', getTodayDate);
refreshPage();
activeTab();
function loadImageData() {
    return fetch('images.json')
            .then(response => response.json());
}

let currentIndex = 0;
let wrapper = document.querySelector('.swiper-wrapper');
const buttonPrevious = document.querySelector('.prev');
const buttonNext =  document.querySelector('.next');

function loadSwiper(){
    loadImageData().then(imageList => {
        createSlidesFromData(imageList, 24);
    });
    buttonPrevious.addEventListener('click', movePrevious);
    buttonNext.addEventListener('click', moveNext);
    updateSlidePosition();
}

function createSlidesFromData(images, chunkSize) {
    wrapper.innerHTML = '';
    for (let i = 0; i < images.length; i += chunkSize) {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        images.slice(i, i + chunkSize).forEach(image => {
            const item = document.createElement('div');
            item.classList.add('swiper-item');
            item.innerHTML = `
                <a href="#">
                    <img src="${image.src}" alt="${image.alt}">
                </a>
                <span class="subscribe">
                    <button class="button-subscribe">+ 구독하기</button>
                </span>
            `;
            slide.appendChild(item);
        });
        wrapper.appendChild(slide);
    }
    currentIndex = 0;
    updateSlidePosition(); 
}

function movePrevious() {
    
    if(currentIndex > 0){
        currentIndex--;
        updateSlidePosition();
    }
}
function moveNext(){
    if (currentIndex < wrapper.children.length - 1) {
        currentIndex++;
        updateSlidePosition();
    }
}
    
function updateSlidePosition(){
    const offset = -currentIndex * 100; 
    wrapper.style.transform = `translateX(${offset}%)`;
    currentIndex === 0 ? buttonPrevious.style.display = 'none' : buttonPrevious.style.display = 'block';
    currentIndex === wrapper.children.length - 1 ? buttonNext.style.display = 'none' : buttonNext.style.display = 'block';
}
document.addEventListener('DOMContentLoaded', loadSwiper);

function getHeadlines() {
    fetch('headlines.json')
    .then(response => response.json())
    .then(headlines => {
        let currentIndex = 0;

        function updateHeadlines() {
            const rollingItems = document.querySelectorAll('.title-list');

            rollingItems.forEach((item, index) => {
                item.querySelectorAll('.title').forEach(titleElement => titleElement.remove());
        
                const headlinesForItem = headlines.slice(currentIndex + index * 5, currentIndex + (index + 1) * 5);
                headlinesForItem.forEach(headline => {
                    const titleElement = document.createElement('p');
                    titleElement.className = 'title';
                    titleElement.textContent = headline;
                    item.append(titleElement);
                });
            });
            currentIndex = (currentIndex + 5) % headlines.length;
        }
        setInterval(updateHeadlines, 3000);
        
    });
}
getHeadlines();