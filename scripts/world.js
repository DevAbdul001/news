const apiKey = 'kuw7gBs0zRzT9Sefw-u2owmAzlonzptH6V-OFvPhDCV4tupW';
const category = 'general';

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

fetchNews().then(worldNews => {
    let worldHtml = '';

    function generateHtml() {
        // Ensure we have enough articles to avoid undefined errors
        if (worldNews.length < 10) {
            console.warn('Not enough articles available.');
            return;
        }

        // Render main articles with images
        worldHtml += `
            <article class="article-card featured-article">
                <img src="${worldNews[0].image}" alt="${worldNews[0].title}">
                <div class="article-content">
                    <h2><a href="article.html">${worldNews[0].title}</a></h2>
                    <p>${worldNews[0].description}</p>
                </div>
            </article>

            <article class="article-card">
                <img src="${worldNews[1].image}" alt="${worldNews[1].title}">
                <div class="article-content">
                    <h2><a href="article.html">${worldNews[1].title}</a></h2>
                    <p>${worldNews[1].description}</p>
                </div>
            </article>

            <article class="article-card trending-sidebar">
                <h3>Trending in World News</h3>
                <ul class="trending-list">`;

        // Render trending articles without images
        for (let i = 2; i <= 6; i++) {
            if (worldNews[i]) { // Check if the article exists
                worldHtml += `<li><a href="article.html">${worldNews[i].title}</a></li>`;
            }
        }

        worldHtml += `
                </ul>
            </article>
            
            <article class="article-card">
                <img src="${worldNews[7].image}" alt="${worldNews[7].title}">
                <div class="article-content">
                    <h2><a href="article.html">${worldNews[7].title}</a></h2>
                    <p>${worldNews[7].description}</p>
                </div>
            </article>

            <article class="article-card">
                <img src="${worldNews[8].image}" alt="${worldNews[8].title}">
                <div class="article-content">
                    <h2><a href="article.html">${worldNews[8].title}</a></h2>
                    <p>${worldNews[8].description}</p>
                </div>
            </article>

            <article class="article-card">
                <img src="${worldNews[9].image}" alt="${worldNews[9].title}">
                <div class="article-content">
                    <h2><a href="article.html">${worldNews[9].title}</a></h2>
                    <p>${worldNews[9].description}</p>
                </div>
            </article>
        `;

        // Append the generated HTML to the .articles-grid container
        const articlesGrid = document.querySelector('.articles-grid');
        articlesGrid.innerHTML = worldHtml; // Update the articles grid with the new content
    }

    generateHtml();
});