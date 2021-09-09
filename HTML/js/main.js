const grid = document.querySelector('#hex-grid-background');
const light = document.querySelector('.light')
const actionContainer = document.querySelector('.action-container')
const navbar = document.querySelector('.navbar');

grid.addEventListener('mousemove', (e) => {
    light.style.left = `${e.clientX}px`;
    light.style.top = `${e.clientY}px`;
});

actionContainer.addEventListener('mousemove', (e) => {
    light.style.left = `${e.clientX}px`;
    light.style.top = `${e.clientY}px`;
});

navbar.addEventListener('mousemove', (e) => {
    light.style.left = `${e.clientX}px`;
    light.style.top = `${e.clientY}px`;
});