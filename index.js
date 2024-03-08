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
    fetch('images.json') 
        .then(response => response.json())
        .then(pressData => {
            const wrapper = document.querySelector('.swiper-wrapper');
            console.log(pressData);
            // 각 슬라이드를 만들고 추가
            let currentSlide;
            let slideCounter = 0;
            pressData.forEach((press, index) => {
                if (index % 24 === 0) {
                    currentSlide = document.createElement('div');
                    currentSlide.classList.add('swiper-slide');
                    wrapper.appendChild(currentSlide);
                    slideCounter++;
                }
                currentSlide.innerHTML += ListComponent(press);
            });
            
            //TODO: 버튼 환성화/비활성화
            const prevButton = document.querySelector('.prev');
            prevButton.disabled = true;

            let currentSlideIndex = 0;

            function updateButtonState() {
                const nextButton = document.querySelector('.next');
                nextButton.disabled = currentSlideIndex === wrapper.children.length - 1;

                const prevButton = document.querySelector('.prev');
                prevButton.disabled = currentSlideIndex === 0;
            }

            updateButtonState();

            document.querySelector('.next').addEventListener('click', () => {
                if (currentSlideIndex < wrapper.children.length - 1) {
                    wrapper.children[currentSlideIndex].style.display = 'none';
                    currentSlideIndex++;
                    wrapper.children[currentSlideIndex].style.display = 'grid';
                    updateButtonState();
                }
            });

            document.querySelector('.prev').addEventListener('click', () => {
                if (currentSlideIndex > 0) {
                    wrapper.children[currentSlideIndex].style.display = 'none';
                    currentSlideIndex--;
                    wrapper.children[currentSlideIndex].style.display = 'grid';
                    updateButtonState();
                }
            });
        });
});


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

