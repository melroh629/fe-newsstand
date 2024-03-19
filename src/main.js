import { getTodayDate, refreshPage } from './js/util.js';
import { activeTab } from './js/tab.js';
import { PressListSwiper, ArticleListSwiper, MoveSlideByTab } from './js/swiper.js'; 
import { updateHeadlines } from './js/rolling-headlines.js';


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#current-date').textContent = getTodayDate();
    refreshPage();
    loadSwipers();
    updateHeadlines();
    
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
        const pressSwiper = new PressListSwiper('.swiper-wrapper1', '.swiper.grid .button.prev', '.swiper.grid .button.next');
        pressSwiper.createSlidesFromData(imageList, 24);
    });
    
    loadArticles().then(articles => {
        const articleSwiper = new ArticleListSwiper('.swiper-wrapper2', '.swiper.type2 .button.prev', '.swiper.type2 .button.next');
        articleSwiper.createSlidesByArticles(articles);
        articleSwiper.startAutoSlideChange();
        MoveSlideByTab();
    });
}
