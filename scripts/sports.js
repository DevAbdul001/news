const apiKey = 'kuw7gBs0zRzT9Sefw-u2owmAzlonzptH6V-OFvPhDCV4tupW';
const category = 'sports';

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

fetchNews().then(sportsNews => {
    let sportsHtml = '';

    function generateHtml() {
        // Ensure we have enough articles to avoid undefined errors
        if (sportsNews.length < 10) {
            console.warn('Not enough articles available.');
            return;
        }

        // Render main articles with images
        sportsHtml += `
            <article class="article-card featured-article">
                <img src="${sportsNews[0].image}" alt="${sportsNews[0].title}">
                <div class="article-content">
                    <h2><a href="article.html">${sportsNews[0].title}</a></h2>
                    <p>${sportsNews[0].description}</p>
                </div>
            </article>

            <article class="article-card">
                <img src="${sportsNews[1].image}" alt="${sportsNews[1].title}">
                <div class="article-content">
                    <h2><a href="article.html">${sportsNews[1].title}</a></h2>
                    <p>${sportsNews[1].description}</p>
                </div>
            </article>

            <article class="article-card trending-sidebar">
                <h3>Trending in Sports News</h3>
                <ul class="trending-list">`;

        // Render trending articles without images
        for (let i = 2; i <= 6; i++) {
            if (sportsNews[i]) { // Check if the article exists
                sportsHtml += `<li><a href="article.html">${sportsNews[i].title}</a></li>`;
            }
        }

        sportsHtml += `
                </ul>
            </article>
            
            <article class="article-card">
                <img src="${sportsNews[7].image}" alt="${sportsNews[7].title}">
                <div class="article-content">
                    <h2><a href="article.html">${sportsNews[7].title}</a></h2>
                    <p>${sportsNews[7].description}</p>
                </div>
            </article>

            <article class="article-card">
                <img src="${sportsNews[8].image}" alt="${sportsNews[8].title}">
                <div class="article-content">
                    <h2><a href="article.html">${sportsNews[8].title}</a></h2>
                    <p>${sportsNews[8].description}</p>
                </div>
            </article>

            <article class="article-card">
                <img src="${sportsNews[9].image}" alt="${sportsNews[9].title}">
                <div class="article-content">
                    <h2><a href="article.html">${sportsNews[9].title}</a></h2>
                    <p>${sportsNews[9].description}</p>
                </div>
            </article>
        `;

        // Append the generated HTML to the .articles-grid container
        const articlesGrid = document.querySelector('.articles-grid');
        articlesGrid.innerHTML = sportsHtml; // Update the articles grid with the new content
    }

    generateHtml();
});