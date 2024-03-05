
// 언론사 목록을 동적으로 생성하는 코드
document.addEventListener('DOMContentLoaded', () => {
    const pressList = document.getElementById('press-list');
    const pressData = [
        { name: '서울경제', imgSrc: 'https://s.pstatic.net/static/newsstand/2019/logo/011.png' },
        //TODO: 다른 언론사 추가
    ];

    pressData.forEach(press => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const img = document.createElement('img');
        const span = document.createElement('span');
        const button = document.createElement('button');
        
        a.href = '#';
        img.src = press.imgSrc;
        img.alt = press.name;
        span.className = 'subscribe';
        button.className = 'button-subscribe';
        button.textContent = '+ 구독하기';
        
        a.appendChild(img);
        span.appendChild(button);
        li.appendChild(a);
        li.appendChild(span);
        pressList.appendChild(li);
    });
});