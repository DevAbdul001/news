export function animation() {
    const categories = document.querySelectorAll('.category');

    function newsSlider(category) {
        const newsItems = category.querySelectorAll('.news');
        let currentIndex = 0;

        if (newsItems.length === 0) return; // Exit if no news items

        function slideNews() {
            newsItems.forEach(item => {
                item.style.transform = 'translateX(100%)';
            });
            newsItems[currentIndex].style.transform = 'translateX(0)';
            currentIndex = (currentIndex + 1) % newsItems.length;
        }
        
        slideNews();
        setInterval(slideNews, 3000);
    }

    // Only call newsSlider if categories exist
    if (categories.length > 0) {
        categories.forEach(newsSlider);
    } else {
        console.warn('No categories found for animation.');
    }
}