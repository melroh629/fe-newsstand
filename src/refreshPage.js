// 뉴스스탠드 아이콘 클릭 시 페이지 리프레시
export const refreshPage = () => {
    const buttonRefresh = document.getElementById('btn-refresh');
    buttonRefresh.addEventListener('click', () => {
        location.reload();
    });
}
