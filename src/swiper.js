export class Swiper {
    constructor(wrapper, buttonPrevious, buttonNext) {
        this.currentIndex = 0;
        this.wrapper = document.querySelector(wrapper);
        this.buttonPrevious = document.querySelector(buttonPrevious);
        this.buttonNext = document.querySelector(buttonNext);
        this.initEventListeners();
        // console.log(buttonPrevious, buttonNext, wrapper)
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
        }
    }
    moveNext() {
        if (this.currentIndex < this.wrapper.children.length - 1) {
            this.currentIndex++;
            this.updateSlidePosition();
        }
    }
}

export class CustomSwiper1 extends Swiper {
    createSlidesFromData(images, chunkSize) {
        console.log(this.wrapper)
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

export class CustomSwiper2 extends Swiper {
    createSlidesByArticles(articles) {
        this.wrapper.innerHTML = ''; 
        
        articles.forEach(article => {
            const articleContainer = document.createElement('div');
            articleContainer.innerHTML = `
                    ${ArticleComponent(article)}
            `;
            articleContainer.classList.add('swiper-slide');
            this.wrapper.appendChild(articleContainer);
        });
        this.currentIndex = 0;
        this.updateSlidePosition();
    }
}
// function MainArticleComponent(article) {
//     return `<a href="${article.url}" class="image-news">
//                 <img src="${article.urlToImage}" alt="">
//             <p>${article.title}</p>
//         </a>`;
// }

// function ArticleListComponent(article) {
//     return `<ul class="title-news">
//         <li>
//             <a href="${article.url}" target="_blank">
//                 ${article.title}
//             </a>
//         </li>
//     </ul>`;
// }

function ArticleComponent (article){
    return `<div class="news-list-by-category">
        <div class="press-info">
            <a href="#" class="logo">
                <img src="https://s.pstatic.net/static/newsstand/2020/logo/light/0604/961.png" alt="메트로뉴스">
            </a>
            <p class="time-stamp">2023.02.10 17:27 편집</p>
            <button role="button">+ 구독하기</button>
        </div>
        <div class="article-box">
            <a href="${article.url}" class="image-news">
                <img src="${article.urlToImage}" alt="">
                <p>${article.title}</p>
            </a>
            <ul class="title-news">
                <li>
                    <a href="${article.url}" target="_blank">
                        ${article.title}
                    </a>
                </li>
            </ul>
        </div>
    </div>`;
}

// const swiper1 = new CustomSwiper1('.swiper-wrapper1');
// const swiper2 = new CustomSwiper2('.swiper-wrapper2');