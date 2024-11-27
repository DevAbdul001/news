const apiKey = 'kuw7gBs0zRzT9Sefw-u2owmAzlonzptH6V-OFvPhDCV4tupW';
const category = 'entertainment';

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

fetchNews().then(entNews => {
    let entHtml = '';

    function generateHtml() {
        // Ensure we have enough articles to avoid undefined errors
        if (entNews.length < 10) {
            console.warn('Not enough articles available.');
            return;
        }

        // Render main articles with images
        entHtml += `
            <article class="article-card featured-article">
                <img src="${entNews[0].image}" alt="${entNews[0].title}">
                <div class="article-content">
                    <h2><a href="article.html">${entNews[0].title}</a></h2>
                    <p>${entNews[0].description}</p>
                </div>
            </article>

            <article class="article-card">
                <img src="${entNews[1].image}" alt="${entNews[1].title}">
                <div class="article-content">
                    <h2><a href="article.html">${entNews[1].title}</a></h2>
                    <p>${entNews[1].description}</p>
                </div>
            </article>

            <article class="article-card trending-sidebar">
                <h3>Trending in Entertainment News</h3>
                <ul class="trending-list">`;

        // Render trending articles without images
        for (let i = 2; i <= 6; i++) {
            if (entNews[i]) { // Check if the article exists
                entHtml += `<li><a href="article.html">${entNews[i].title}</a></li>`;
            }
        }

        entHtml += `
                </ul>
            </article>
            
            <article class="article-card">
                <img src="${entNews[7].image}" alt="${entNews[7].title}">
                <div class="article-content">
                    <h2><a href="article.html">${entNews[7].title}</a></h2>
                    <p>${entNews[7].description}</p>
                </div>
            </article>

            <article class="article-card">
                <img src="${entNews[8].image}" alt="${entNews[8].title}">
                <div class="article-content">
                    <h2><a href="article.html">${entNews[8].title}</a></h2>
                    <p>${entNews[8].description}</p>
                </div>
            </article>

            <article class="article-card">
                <img src="${entNews[9].image}" alt="${entNews[9].title}">
                <div class="article-content">
                    <h2><a href="article.html">${entNews[9].title}</a></h2>
                    <p>${entNews[9].description}</p>
                </div>
            </article>
        `;

        // Append the generated HTML to the .articles-grid container
        const articlesGrid = document.querySelector('.articles-grid');
        articlesGrid.innerHTML = entHtml; // Update the articles grid with the new content
    }

    generateHtml();
});