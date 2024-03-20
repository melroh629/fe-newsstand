export function ComponentAlert(pressName) {
    return`<div class="alert">
        <p>
            <strong>${pressName}</strong>을(를)<br>
            구독해지하시겠습니까?
        </p>
        <button>확인</button><button></button>
    </div>`
}

export function ComponentSubscribeSuccess() {
    return`<div class="subscribe-success">
        <p>내가 구독한 언론사에 추가되었습니다.</p>
    </div>
    `
}