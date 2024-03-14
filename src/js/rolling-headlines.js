export function updateHeadlines() {
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