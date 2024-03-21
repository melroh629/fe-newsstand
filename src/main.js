import { getTodayDate, refreshPage } from './js/util.js';
import { activeTab } from './js/tab.js';
import { PressListSwiper, ArticleListSwiper, MoveSlideByTab } from './js/swiper.js'; 
import { getHeadlines } from './js/rolling-headlines.js';
import { handleSubscribe } from './js/subscribe.js';


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#current-date').textContent = getTodayDate();
    refreshPage();
    loadSwipers();
    getHeadlines();
});

activeTab(document.querySelectorAll('.tab-view-type .button-tab'), document.querySelectorAll('#tabViewType > .tab-content'));


//여기서 images.json인지 db.json인지 분기처리 하자

let imagePath = './data/images.json';

function loadImageData(imagePath) {
    return fetch(imagePath)
            .then(response => response.json());
}

function loadArticles() {
    return fetch('./data/articles.json')
            .then(response => response.json());
}

function loadSwipers() {
    Promise.all([loadImageData(imagePath), loadArticles()]).then(([imageList, articles]) => {
        const pressSwiper = new PressListSwiper('.swiper-wrapper1', '.swiper.grid .button.prev', '.swiper.grid .button.next');
        pressSwiper.createSlidesFromData(imageList, 24);
        handleSubscribe();

        const articleSwiper = new ArticleListSwiper('.swiper-wrapper2', '.swiper.type2 .button.prev', '.swiper.type2 .button.next');
        articleSwiper.createSlidesByArticles(articles);
        articleSwiper.startAutoSlideChange();
        MoveSlideByTab();
    });
}

document.querySelector('#pressSubscribe').addEventListener('click', function() {
    imagePath = 'http://localhost:3000/subscription';
    console.log(imagePath);
    loadSwipers();
});

document.querySelector('#pressAll').addEventListener('click', function() {
    imagePath = './data/images.json';
    loadSwipers();
});