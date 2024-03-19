import { getTodayDate, refreshPage } from './js/util.js';
import { activeTab } from './js/tab.js';
import { CustomSwiper1, CustomSwiper2, MoveSlideByTab } from './js/swiper.js'; 
import { updateHeadlines } from './js/rolling-headlines.js';


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#current-date').textContent = getTodayDate();
    refreshPage();
    loadSwipers();
    updateHeadlines();
    MoveSlideByTab();
});
const TabViewType = document.querySelector('.tab-view-type .button-tab');
TabViewType.addEventListener('click', function(){
    activeTab();
})
function loadImageData() {
    return fetch('./data/images.json')
            .then(response => response.json());
}

function loadArticles() {
    return fetch('./data/articles.json')
            .then(response => response.json());
}
function loadSwipers() {
    loadImageData().then(imageList => {
        const swiper1 = new CustomSwiper1('.swiper-wrapper1', '.swiper.grid .button.prev', '.swiper.grid .button.next');
        swiper1.createSlidesFromData(imageList, 24);
    });
    
    loadArticles().then(articles => {
        const swiper2 = new CustomSwiper2('.swiper-wrapper2', '.swiper.type2 .button.prev', '.swiper.type2 .button.next');
        swiper2.createSlidesByArticles(articles);
    });
}

