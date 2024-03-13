const puppeteer = require('puppeteer');
const fs = require('fs');

async function getPressImages(page) {
    let images = [];
    let newImages = await page.$$eval('.news_logo', elements => elements.map(element => ({
        src: element.getAttribute('src'),
        alt: element.getAttribute('alt')
    })));
    images.push(...newImages)
    for(let i = 0; i < 3; i++)  {
        await page.click('.ContentPagingView-module__btn_next___ZBhby');
        const newImages = await page.$$eval('.news_logo', elements => elements.map(element => ({
            src: element.getAttribute('src'),
            alt: element.getAttribute('alt')
        })));
        images.push(...newImages);
    }
    return images;
}

async function getHeadlines(page) {
    let headlines = [];
    let previousHeadline = null;
    let headlinesPromise = new Promise(resolve => {
        let intervalId = setInterval(() => {
            page.$eval('.ContentHeaderSubView-module__news_box___dH9b3', element => element.textContent)
            .then(currentHeadline => {
                if(currentHeadline !== previousHeadline) {
                    headlines.push(currentHeadline);
                    previousHeadline = currentHeadline;
                }
            });
        }, 500);

        setTimeout(() => {
            clearInterval(intervalId);
            resolve();
        }, 30000);
    });

    await headlinesPromise;
    return headlines
}

function saveToJson(images, headlines) {
    const imagesJson = JSON.stringify(images, null, 2);
    const headlinesJson = JSON.stringify(headlines, null, 2);
    fs.writeFileSync('images.json', imagesJson);
    fs.writeFileSync('headlines.json', headlinesJson);
}


async function getPressImageList() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.naver.com/');

    const images = await getPressImages(page);
    const headlines = await getHeadlines(page);

    await browser.close();

    saveToJson(images, headlines);

    console.log(images.length)
    return { images, headlines };
}

getPressImageList()