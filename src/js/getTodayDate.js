//시스템 날짜 노출
export const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const day = today.getDay();
    const weekDay = ['일', '월', '화', '수', '목', '금', '토'];
    
    document.getElementById('current-date').textContent = `${year}년 ${month}월 ${date}일 ${weekDay[day]}요일`;
}