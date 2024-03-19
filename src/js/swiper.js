export class Swiper {
    constructor(wrapper, buttonPrevious, buttonNext) {
        this.currentIndex = 0;
        this.wrapper = document.querySelector(wrapper);
        this.buttonPrevious = document.querySelector(buttonPrevious);
        this.buttonNext = document.querySelector(buttonNext);
        this.initEventListeners();
    }
    initEventListeners() {
        this.buttonPrevious.addEventListener('click', () => this.movePrevious());
        this.buttonNext.addEventListener('click', () => this.moveNext());
        this.updateSlidePosition();
    }
    updateSlidePosition() {
        const offset = -this.currentIndex * 100;
        this.wrapper.style.transform = `translateX(${offset}%)`;
        this.buttonPrevious.style.display = this.currentIndex === 0 ? 'none' : 'block';
        this.buttonNext.style.display = this.currentIndex === this.wrapper.children.length - 1 ? 'none' : 'block';
    }
    movePrevious() {
        if(this.currentIndex > 0){ 
            this.currentIndex--;
            this.updateSlidePosition();
            this.updateActiveTab();
        }
    }
    moveNext() {
        if (this.currentIndex < this.wrapper.children.length - 1) {
            this.currentIndex++;
            this.updateSlidePosition();
            this.updateActiveTab();
        }
    }
}

export class PressListSwiper extends Swiper {
    createSlidesFromData(images, chunkSize) {
        this.wrapper.innerHTML = '';
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
            this.wrapper.appendChild(slide);
        }
        this.currentIndex = 0;
        this.updateSlidePosition();
    }
}

export class ArticleListSwiper extends Swiper {
    createSlidesByArticles(articles) {
        this.wrapper.innerHTML = '';

        articles.forEach((article, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = `swiper-slide slide${index}`;

            const newsListDiv = document.createElement('div');
            newsListDiv.className = 'news-list-by-category';

            
            const pressInfoDiv = document.createElement('div');
            pressInfoDiv.className = 'press-info';
            pressInfoDiv.innerHTML = `
                <a href="#" class="logo">
                    <img src="https://s.pstatic.net/static/newsstand/2020/logo/light/0604/961.png" alt="메트로뉴스">
                </a>
                <p class="time-stamp">2023.02.10 17:27 편집</p>
                <button role="button">+ 구독하기</button>
            `;
            newsListDiv.appendChild(pressInfoDiv);

            
            const articleBoxDiv = document.createElement('div');
            articleBoxDiv.className = 'article-box';

            
            const imageNewsAnchor = document.createElement('a');
            imageNewsAnchor.href = article.headlines[0].url;
            imageNewsAnchor.className = 'image-news';
            imageNewsAnchor.innerHTML = `
                <img src="${article.headlines[0].image || 'https://s.pstatic.net/static/newsstand/up/2020/0903/nsd185259316.png'}" alt="">
                <p>${article.headlines[0].title}</p>
            `;
            articleBoxDiv.appendChild(imageNewsAnchor);

            
            const titleNewsUl = document.createElement('ul');
            titleNewsUl.className = 'title-news';


            article.headlines.slice(1).forEach(headline => {
                const li = document.createElement('li');
                const anchor = document.createElement('a');
                anchor.href = headline.url;
                anchor.target = '_blank';
                anchor.textContent = headline.title;
                li.appendChild(anchor);
                titleNewsUl.appendChild(li);
            });

            articleBoxDiv.appendChild(titleNewsUl);
            newsListDiv.appendChild(articleBoxDiv);
            slideDiv.appendChild(newsListDiv);

            
            this.wrapper.appendChild(slideDiv);
        });
        this.currentIndex = 0;
        MoveSlideByTab();
        this.updateSlidePosition();
    }
    startAutoSlideChange(interval = 20000) {
        this.autoSlideInterval = setInterval(() => {
            this.moveNext();
            this.updateActiveTab();
        }, interval);
    }

    updateActiveTab() {
        const tabButtons = document.querySelectorAll('.tab-category .button-tab');
        updateActiveTabs(tabButtons, this.currentIndex);
    }
}


export function MoveSlideByTab() {
    const tabButtons = document.querySelectorAll('.tab-category .button-tab');
    const swiperWrapper = document.querySelector('.swiper-wrapper2');
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            updateActiveTabs(tabButtons, index);
            translateX(swiperWrapper, index);
            const swiperInstance = swiperWrapper.__swiperInstance;
            if (swiperInstance) {
                swiperInstance.currentIndex = index;
                swiperInstance.updateSlidePosition();
            }
        });
    });
}

function updateActiveTabs(buttons, activeIndex) {
    buttons.forEach((btn, index) => {
        btn.classList.remove('active');
        if (index === activeIndex) {
            btn.classList.add('active');
        }
    });
}

function translateX(wrapper, index){
    wrapper.style.transform = `translateX(-${index * 100}%)`;
}



