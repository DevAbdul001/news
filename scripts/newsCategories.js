const apiKey = 'kuw7gBs0zRzT9Sefw-u2owmAzlonzptH6V-OFvPhDCV4tupW';

export async function getNewsByCategory(category) {
    try {
        
        const response = await fetch(`https://api.currentsapi.services/v1/search?category=${category}&apiKey=${apiKey}`);

        
        if (!response.ok) {
            throw new Error(`Failed to fetch news. Status: ${response.status}`);
        }

        
        const news = await response.json();

        
        return news.news; 

    } catch (error) {
        console.error('Error fetching news:', error);
    }
}