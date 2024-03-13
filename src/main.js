import { getTodayDate } from './getTodayDate.js';
import { refreshPage } from './refreshPage.js';
import { activeTab } from './tab.js';
import { getNewsArticles }  from './articles.js'
import { CustomSwiper1, CustomSwiper2 } from './swiper.js'; 


document.addEventListener('DOMContentLoaded', () => {
    getTodayDate();
    refreshPage();
    activeTab();
    loadSwipers();
    getHeadlines();
});
function loadImageData() {
    return fetch('images.json')
            .then(response => response.json());
}
function loadSwipers() {
    loadImageData().then(imageList => {
        const swiper1 = new CustomSwiper1('.swiper-wrapper1', '.swiper.grid .button.prev', '.swiper.grid .button.next');
        swiper1.createSlidesFromData(imageList, 24);
    });

    getNewsArticles().then(articles => {
        const swiper2 = new CustomSwiper2('.swiper-wrapper2', '.swiper.type2 .button.prev', '.swiper.type2 .button.next');
        swiper2.createSlidesByArticles(articles);
    });
}


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

