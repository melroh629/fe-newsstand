/**
 * 오늘 날짜를 반환하는 함수
 */
export const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const day = today.getDay();
    const weekDay = ['일', '월', '화', '수', '목', '금', '토'];
    return `${year}년 ${month}월 ${date}일 ${weekDay[day]}요일`; // 이렇게하면 범용성을 높일수 있음
}
/**
 * 페이지 새로고침하는 함수
 */
export const refreshPage = () => {
    const buttonRefresh = document.getElementById('btn-refresh');
    buttonRefresh.addEventListener('click', () => {
        location.reload();
    });
}
