const puppeteer = require('puppeteer');
const fs = require('fs');

async function getPressImageList() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.naver.com/');

    let images = [];
    for(let i = 0; i < 3; i++)  {
        await page.click('.ContentPagingView-module__btn_next___ZBhby');
        const newImages = await page.$$eval('.news_logo', elements => elements.map(element => ({
            src: element.getAttribute('src'),
            alt: element.getAttribute('alt')
        })));
        images = images.concat(newImages);
    }

    /**
     * TODO: 관심사 분리
     * 이미지 가져오는것
     * 헤드라인 가져오는것
     * 각각 JSON 파일로 저장
     */
    let headlines = [];
    // let previousHeadline = null;
    // let headlinesPromise = new Promise(resolve => {
    // let intervalId = setInterval(() => {
    //     page.$eval('.ContentHeaderSubView-module__news_box___dH9b3', element => element.textContent)
    //     .then(currentHeadline => {
    //         if(currentHeadline !== previousHeadline) {
    //         headlines.push(currentHeadline);
    //         previousHeadline = currentHeadline;
    //         }
    //     });
    // }, 500);

    // setTimeout(() => {
    //     clearInterval(intervalId);
    //     resolve();
    // }, 30000);
    // });

    // await headlinesPromise;


    await browser.close();
    const imagesJson = JSON.stringify(images);

    const headlinesJson = JSON.stringify(headlines, null, 2);
    fs.writeFileSync('images.json', imagesJson);

    fs.writeFileSync('headlines.json', headlinesJson);

    console.log(images.length)
    return { images, headlines };
}

getPressImageList().then(console.log);