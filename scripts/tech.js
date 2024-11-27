const apiKey = 'kuw7gBs0zRzT9Sefw-u2owmAzlonzptH6V-OFvPhDCV4tupW';
const category = 'technology';

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

fetchNews().then(techNews => {
    let techHtml = '';

    function generateHtml() {
        // Ensure we have enough articles to avoid undefined errors
        if (techNews.length < 10) {
            console.warn('Not enough articles available.');
            return;
        }

        // Render main articles with images
        techHtml += `
            <article class="article-card featured-article">
                <img src="${techNews[0].image}" alt="${techNews[0].title}">
                <div class="article-content">
                    <h2><a href="article.html">${techNews[0].title}</a></h2>
                    <p>${techNews[0].description}</p>
                </div>
            </article>

            <article class="article-card">
                <img src="${techNews[1].image}" alt="${techNews[1].title}">
                <div class="article-content">
                    <h2><a href="article.html">${techNews[1].title}</a></h2>
                    <p>${techNews[1].description}</p>
                </div>
            </article>

            <article class="article-card trending-sidebar">
                <h3>Trending in Technology</h3>
                <ul class="trending-list">`;

        // Render trending articles without images
        for (let i = 2; i <= 6; i++) {
            if (techNews[i]) { // Check if the article exists
                techHtml += `<li><a href="article.html">${techNews[i].title}</a></li>`;
            }
        }

        techHtml += `
                </ul>
            </article>
            
            <article class="article-card">
                <img src="${techNews[7].image}" alt="${techNews[7].title}">
                <div class="article-content">
                    <h2><a href="article.html">${techNews[7].title}</a></h2>
                    <p>${techNews[7].description}</p>
                </div>
            </article>

            <article class="article-card">
                <img src="${techNews[8].image}" alt="${techNews[8].title}">
                <div class="article-content">
                    <h2><a href="article.html">${techNews[8].title}</a></h2>
                    <p>${techNews[8].description}</p>
                </div>
            </article>

            <article class="article-card">
                <img src="${techNews[9].image}" alt="${techNews[9].title}">
                <div class="article-content">
                    <h2><a href="article.html">${techNews[9].title}</a></h2>
                    <p>${techNews[9].description}</p>
                </div>
            </article>
        `;

        // Append the generated HTML to the .articles-grid container
        const articlesGrid = document.querySelector('.articles-grid');
        articlesGrid.innerHTML = techHtml; // Update the articles grid with the new content
    }

    generateHtml();
});