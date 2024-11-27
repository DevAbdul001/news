import { animation } from './animation.js';
import { getNewsByCategory } from './newsCategories.js';

const apiKey = 'kuw7gBs0zRzT9Sefw-u2owmAzlonzptH6V-OFvPhDCV4tupW';

async function fetchNews() {
    try {
        const response = await fetch(`https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}`);

        if (!response.ok) {
            throw new Error('Failed to fetch news articles.');
        }

        const data = await response.json();
        const newsArticles = data.news; // Ensure this matches the API response structure

        // Filter to only include articles with images
        const articlesWithImages = newsArticles.filter(article => article.image && article.title);
        const shuffledArticles = shuffleArray(articlesWithImages); // Shuffle only articles with images

        const topStories = shuffledArticles.slice(0, 3);
        const newsContainer = document.getElementById('newsContainer');

        if (topStories.length === 0) {
            newsContainer.innerHTML = '<p>No news articles available with images.</p>';
            return;
        }

        let newsContainerHtml = createNewsHTML(topStories);
        newsContainer.innerHTML = newsContainerHtml;

    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

function createNewsHTML(topStories) {
    let newsContainerHtml = `
        <section class="hero-section">
            <div class="main-story">
                <img src="${topStories[0].image}" alt="${topStories[0].title}">
                <div class="main-story-content">
                    <h1><a href="article.html">${topStories[0].title}</a></h1>
                    <p>${topStories[0].description}</p>
                </div>
            </div>
            <div class="side-stories">`;

    for (let i = 1; i < topStories.length; i++) {
        newsContainerHtml += `
            <div class="side-story">
                <img src="${topStories[i].image}" alt="${topStories[i].title}">
                <div class="side-story-content">
                    <h3><a href="article.html">${topStories[i].title}</a></h3>
                </div>
            </div>`;
    }

    newsContainerHtml += `
            </div>
        </section>`;

    return newsContainerHtml;
}

function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

async function generateCategoryHtml() {
    document.addEventListener('DOMContentLoaded', fetchNews);

    const categories = {
        world: 'opinion', // Assuming this is the correct category for world news
        tech: 'technology',
        sports: 'sports',
        ent: 'entertainment' // Ensure this matches the API category
    };

    try {
        await Promise.all(Object.entries(categories).map(async ([key, category]) => {
            const articles = await getNewsByCategory(category);
            console.log(`Articles for category ${category}:`, articles); // Debugging log
            let newsHtml = '';

            // Filter articles to only include those with images
            const articlesWithImages = articles.filter(article => article.image && article.title);

            // Check if there are articles with images
            if (Array.isArray(articlesWithImages) && articlesWithImages.length > 0) {
                articlesWithImages.forEach((article) => {
                    newsHtml += `
                        <div class="news">
                            <img src="${article.image}" alt="${article.title}">
                            <h1><a href="article.html">${article.title}</a></h1>
                        </div>
                    `;
                });

                let container = document.getElementById(`${key === 'world' ? 'worldNews' : key === 'tech' ? 'techNews' : key === 'sports' ? 'sportsNews' : 'ent'}`);
                if (container) {
                    container.innerHTML += newsHtml; // Append the generated HTML
                }
            } else {
                console.warn(`No articles found with images for category: ${category}`);
                let container = document.getElementById(`${key === 'world' ? 'worldNews' : key === 'tech' ? 'techNews ' : key === 'sports' ? 'sportsNews' : 'ent'}`);
                if (container) {
                    container.innerHTML += '<p>No articles available with images.</p>'; // Provide feedback if no articles with images
                }
            }
        }));

        animation(); // Call animation function if needed
    } catch (error) {
        console.error('Error fetching news by category', error);
    }
}

generateCategoryHtml();