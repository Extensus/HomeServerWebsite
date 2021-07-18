const grid = document.querySelector('#hex-grid');
const light = document.querySelector('.light')

grid.addEventListener('mousemove', function(e) {
light.style.left = `${e.clientX}px`;
light.style.top = `${e.clientY}px`;
});

document.getElementById("filedrop_redirect").addEventListener("click", getWebInfo);
function getWebInfo() {
    window.location.href="../g/filedrop.html";
};