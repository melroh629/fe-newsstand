let headlines = [];
export function getHeadlines() {
    fetch('./data/headlines.json')
        .then(response => response.json())
        .then(data => {
            headlines = data;
            updateHeadlines(headlines);
        })
        .catch(error => console.error('Error:', error));
}
export function updateHeadlines(headline) {
    //TODO: 매직넘버 제거할수 있는 방법 알아보기(0, 4, 4, 9)
    const leftHeadline = headline?.slice(0, 4);
    const rightHeadline = headline?.slice(4, 9);
    
    const leftHeadlineContainer = document.querySelector('#rollingLeft');
    const rightHeadlineContainer = document.querySelector('#rollingRight');
    
    leftHeadlineContainer.innerHTML = leftHeadline.map((headline)=>{
        return HeadLineTitleComponent(headline);
    }).join('');
    rightHeadlineContainer.innerHTML = rightHeadline.map((headline) => {
        return HeadLineTitleComponent(headline);
    }).join('');
    
}
function HeadLineTitleComponent(headline) {
    return `<div class="title-list"><b>연합뉴스</b><a href="${headline.link}" class="title">${headline.title}</a></div>`;
}



getHeadlines();

