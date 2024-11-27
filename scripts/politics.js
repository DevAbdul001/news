const apiKey = 'kuw7gBs0zRzT9Sefw-u2owmAzlonzptH6V-OFvPhDCV4tupW';
const category = 'politics';

async function fetchNews() {
    try {
        const response = await fetch(`https://api.currentsapi.services/v1/latest-news?category=${category}&apiKey=${apiKey}`);
        if (!response.ok) {
            throw new Error('Failed to fetch news articles.');
        }
        const data = await response.json();
        return data.news; // Assuming the API returns an array of news articles
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

fetchNews().then(news => {
    let politicsHtml = '';

    function generateHtml() {
        // Ensure we have enough articles to avoid undefined errors
        if (news.length < 10) {
            console.warn('Not enough articles available.');
            return;
        }

        // Render main articles with images
        politicsHtml += `
            <article class="article-card featured-article">
                <img src="${news[0].image}" alt="${news[0].title}">
                <div class="article-content">
                    <h2><a href="article.html">${news[0].title}</a></h2>
                    <p>${news[0].description}</p>
                </div>
            </article>

            <article class="article-card">
                <img src="${news[1].image}" alt="${news[1].title}">
                <div class="article-content">
                    <h2><a href="article.html">${news[1].title}</a></h2>
                    <p>${news[1].description}</p>
                </div>
            </article>

            <article class="article-card trending-sidebar">
                <h3>Trending in Politics</h3>
                <ul class="trending-list">`;

        // Render trending articles without images
        for (let i = 2; i <= 6; i++) {
            if (news[i]) { // Check if the article exists
                politicsHtml += `<li><a href="article.html">${news[i].title}</a></li>`;
            }
        }

        politicsHtml += `
                </ul>
            </article>
            
            <article class="article-card">
                <img src="${news[7].image}" alt="${news[7].title}">
                <div class="article-content">
                    <h2><a href="article.html">${news[7].title}</a></h2>
                    <p>${news[7].description}</p>
                </div>
            </article>

            <article class="article-card">
                <img src="${news[8].image}" alt="${news[8].title}">
                <div class="article-content">
                    <h2><a href="article.html">${news[8].title}</a></h2>
                    <p>${news[8].description}</p>
                </div>
            </article>

            <article class="article-card">
                <img src="${news[9].image}" alt="${news[9].title}">
                <div class="article-content">
                    <h2><a href="article.html">${news[9].title}</a></h2>
                    <p>${news[9].description}</p>
                </div>
            </article>
        `;

        // Append the generated HTML to the .articles-grid container
        const articlesGrid = document.querySelector('.articles-grid');
        articlesGrid.innerHTML = politicsHtml; // Update the articles grid with the new content
    }

    generateHtml();
});