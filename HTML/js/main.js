const grid = document.querySelector('#hex-grid');
const light = document.querySelector('.light')

grid.addEventListener('mousemove', function(e) {
light.style.left = `${e.clientX}px`;
light.style.top = `${e.clientY}px`;
});
