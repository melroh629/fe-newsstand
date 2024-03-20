export function ImageGridItem (image) {
    return `<div class="swiper-item">
    <a href="#">
            <img src="${image.src}" alt="${image.alt}">
        </a>
        <span class="subscribe">
            <button class="button-subscribe">+ 구독하기</button>
        </span>
        </div>`;
}
