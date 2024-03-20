export function handleSubscribe(){
    const buttonSubscribe = document.querySelectorAll('.swiper-item .button-subscribe');
    buttonSubscribe.forEach((button,index) => {
        button.addEventListener('click', function(){
            const pressName = this.closest('.swiper-item').querySelector('img').alt;
            const pressImgSrc = this.closest('.swiper-item').querySelector('img').src;
            const subscribeList = {
                id: `${index}`,
                pressName: pressName,
                pressImgSrc: pressImgSrc
            };
            handleSubmitList(subscribeList);
        });
    });
}

function snackBar() {
    const test = document.createElement('div');
    test.className = 'subscribe-success';
    test.textContent = '내가 구독한 언론사에 추가되었습니다.';
    document.body.appendChild(test); 

    setTimeout(() => {
        test.remove();
    }, 5000);
}


function handleSubmitList(subscribeList){
    fetch('http://localhost:3000/subscription', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscribeList)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        snackBar();
    })
}
