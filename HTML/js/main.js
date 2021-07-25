const grid = document.querySelector('#hex-grid-background');
const light = document.querySelector('.light')
const actionContainer = document.querySelector('.action-container')

grid.addEventListener('mousemove', function(e) {
light.style.left = `${e.clientX}px`;
light.style.top = `${e.clientY}px`;
});

actionContainer.addEventListener('mousemove', function(e) {
light.style.left = `${e.clientX}px`;
light.style.top = `${e.clientY}px`;
});