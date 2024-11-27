const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const image = document.querySelector('.image');

btn1.addEventListener('click', () => {
    image.style.transform = 'translateY(-100%)'; // Move image down
});

btn2.addEventListener('click', () => {
    image.style.transform = 'translateY(0)'; // Move image back to original position
});