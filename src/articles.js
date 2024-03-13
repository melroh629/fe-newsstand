export function getNewsArticles(){
    let url = `https://newsapi.org/v2/top-headlines?country=kr&apiKey=a770cf327e5149cebf9a4d30b172c64a`;
    let req = new Request(url);

    return fetch(req)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let articleList = [...data.articles]
        console.log(articleList);
        return articleList;
    });
}