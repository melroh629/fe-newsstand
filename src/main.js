import { getTodayDate } from './js/getTodayDate.js';
import { refreshPage } from './js/refreshPage.js';
import { activeTab } from './js/tab.js';
import { getNewsArticles }  from './js/articles.js'
import { CustomSwiper1, CustomSwiper2 } from './js/swiper.js'; 


document.addEventListener('DOMContentLoaded', () => {
    getTodayDate();
    refreshPage();
    activeTab();
    loadSwipers();
    getHeadlines();
});
function loadImageData() {
    return fetch('./data/images.json')
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

