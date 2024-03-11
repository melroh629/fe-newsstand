// 뉴스스탠드 아이콘 클릭 시 페이지 리프레시
const buttonRefresh = document.getElementById('btn-refresh');
const refreshPage = () => {
    location.reload();
}
buttonRefresh.addEventListener('click', refreshPage);

//시스템 날짜 노출
const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const day = today.getDay();
    const weekDay = ['일', '월', '화', '수', '목', '금', '토'];
    
    document.getElementById('current-date').textContent = `${year}년 ${month}월 ${date}일 ${weekDay[day]}요일`;
}
document.addEventListener('DOMContentLoaded', getTodayDate);



document.addEventListener('DOMContentLoaded', () => {
    createSwiper();
    setupEventListeners();
});

function createSwiper() {
    fetch('images.json')
        .then(response => response.json())
        .then(pressData => {
            const wrapper = document.querySelector('.swiper-wrapper');
            let currentSlide;
            pressData.forEach((press, index) => {
                if (index % 24 === 0) {
                    currentSlide = document.createElement('div');
                    currentSlide.classList.add('swiper-slide');
                    wrapper.appendChild(currentSlide);
                }
                currentSlide.innerHTML += ListComponent(press);
            });
            updateButtonState(); 
        });
}

function updateButtonState() {
    const wrapper = document.querySelector('.swiper-wrapper');
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    let currentSlideIndex = Array.from(wrapper.children).findIndex(slide => slide.style.display !== 'none');

    nextButton.disabled = currentSlideIndex === wrapper.children.length - 1;
    prevButton.disabled = currentSlideIndex === 0;
}

function moveToNextSlide() {
    const wrapper = document.querySelector('.swiper-wrapper');
    let currentSlideIndex = Array.from(wrapper.children).findIndex(slide => slide.style.display !== 'none');

    if (currentSlideIndex < wrapper.children.length - 1) {
        wrapper.children[currentSlideIndex].style.display = 'none';
        currentSlideIndex++;
        wrapper.children[currentSlideIndex].style.display = 'grid';
        updateButtonState();
    }
}

function moveToPreviousSlide() {
    const wrapper = document.querySelector('.swiper-wrapper');
    let currentSlideIndex = Array.from(wrapper.children).findIndex(slide => slide.style.display !== 'none');

    if (currentSlideIndex > 0) {
        wrapper.children[currentSlideIndex].style.display = 'none';
        currentSlideIndex--;
        wrapper.children[currentSlideIndex].style.display = 'grid';
        updateButtonState();
    }
}

function setupEventListeners() {
    document.querySelector('.next').addEventListener('click', moveToNextSlide);
    document.querySelector('.prev').addEventListener('click', moveToPreviousSlide);
}


function ListComponent(press) {
    return `
        <div class="swiper-item">
            <a href="#">
                <img id="pressLogo" src="${press.src}" alt="${press.alt}">
            </a>
            <span class="subscribe">
                <button class="button-subscribe">+ 구독하기</button>
            </span>
        </div>
        `
}

// 헤드라인 기사 롤링 배너

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